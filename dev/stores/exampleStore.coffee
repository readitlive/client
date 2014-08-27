merge = require('react/lib/merge')
EventEmitter = require('events').EventEmitter
AppDispatcher = require('../dispatchers/appDispatcher')
constants = require('../constants/constants')

CHANGE_EVENT = 'change'

_records = []
_tableHeaders = {}
_pk = ''
_savedStatus = constants.SAVED
_currentChanges = []
_pendingChanges = []

# storing changes
# _changes is a stack of each change: {row: 3, pk: bob, key: a_key, oldValue: 17, newValue: 18 }
# a cell change comes in, and:
  # the change object is generated, and pushed to the change stack
  # the stored records are updated
  # the changed field in the stored records is given a "changed" attribute?
  # set current state to "unsaved changes"

# undo is handled by popping the top off and updating the data accordingly
  # set current state to "saved" if it was the only change on the stack

# clear changes: go throguh each item in the change stack in reverse order, and update the data accordingly
  # set current state to "saved"

# save / getUpdateDiff:
  # go through the changes in chronological order and generate a 'diff', with the PK and changed fields
  # ? move all these changes to a "pending changes" object?
  # set the current state to "saving"

# save success message from server:
  # empty the _change stack
    # ----NB only remove changes that were made before the save request was generated!
    # or clear the "pending changes" object only
  # if there's nothing on the change stack, set current state to "saved"

# save error message from server:
 # ??

_addRecordsData = (data) ->
  #TODO: this should append rather than replace, this way we can cache results
  _records = data.records
  _tableHeaders = data.headers
  _pk = data.pk

_updateCell = (index, key, value)->
  thisChange = {
    row: index
    pk: _records[index][_pk]
    key: key
    oldValue: _records[index][key]
    newValue: value
  }
  _records[index][key] = value
  _currentChanges.push(thisChange)
  _savedStatus = constants.UNSAVED

_undoLastChange = ->
  if _currentChanges.length > 0
    thisChange = _currentChanges.pop()
    _records[thisChange.row][thisChange.key] = thisChange.oldValue
    if _currentChanges.length == 0
      _savedStatus = constants.SAVED

#TODO: handle any data that the server sends back
_serverUpdateSuccess = (update) ->
  if _currentChanges.length == 0
    _savedStatus = constants.SAVED
  _pendingChanges = []

_serverUpdateFailure = ->
  # TODO: ??



RecordsStore = merge(EventEmitter.prototype, {
    emitChange: ->
      @emit CHANGE_EVENT

    addChangeListener: (callback) ->
      @on(CHANGE_EVENT, callback)

    removeChangeListener: (callback) ->
      @removeListener CHANGE_EVENT, callback

    getAllRecords: ->
      _records

    getTableHeaders: ->
      # oterates over Headers and returns only the values for each key
      # the values are nicely formatted, the keys are the DB column names
      headers = for own key, value of _tableHeaders
        value
      headers

    getSavedStatus: ->
      _savedStatus

    getCurrentUpdate: ->
      update = []
      for change in _currentChanges
        update.push({
          pk: change.pk
          key: change.key
          value: change.newValue
        })
      #TODO: Disable save button during pending change request
      _savedStatus = constants.SAVE_PENDING
      _pendingChanges = _currentChanges
      _currentChanges = []
      update



})

RecordsStore.dispatcherToken = AppDispatcher.register (payload) ->
  action = payload.action # this is the action from handleViewAction
  actionTypes = constants.ActionTypes

  switch action.actionType
    when actionTypes.RECORDS_UPDATE_CELL
      _updateCell action.row, action.col, action.value
      RecordsStore.emitChange()
      break
    when actionTypes.RECORDS_UNDO_CHANGE
      _undoLastChange()
      RecordsStore.emitChange()
      break

      # callbacks for receiving initial data, updates from server
    when actionTypes.RECEIVE_ALL_RECORDS
      _addRecordsData action.data
      RecordsStore.emitChange()
      break

    when actionTypes.RECEIVE_RECORDS_UPDATE_SUCCESS
      _serverUpdateSuccess action.updated
      RecordsStore.emitChange()
      break

    when actionTypes.RECEIVE_RECORDS_UPDATE_ERROR
      _serverUpdateFailure
      RecordsStore.emitChange()
      break



  true # needed for promises to resolve


module.exports = RecordsStore
