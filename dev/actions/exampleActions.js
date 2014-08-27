constants = require('../constants/constants').ActionTypes
AppDispatcher = require('../dispatchers/appDispatcher')
RecordsStore = require('../stores/RecordsStore')
ApiRequest = require('../helpers/ApiHelper')

RecordsActions = {

  getRecords: ->
    ApiRequest('GET', '/records', null, RecordsActions.receiveAllRecords)


  updateCell: (data) ->
    AppDispatcher.handleViewAction({
      actionType: constants.RECORDS_UPDATE_CELL,
      row: data.row,
      col: data.column,
      value: data.value
    })

  undoChange: ->
    AppDispatcher.handleViewAction({
      actionType: constants.RECORDS_UNDO_CHANGE
      })


  saveChanges: ->
    # get the entire save - the deff between local data and the server
    # the store will need to generate the the "diff"
    # and then send to the api
    diff = RecordsStore.getCurrentUpdate()

    ApiRequest('POST', '/records', diff, RecordsActions.recordsDidUpdate)

  # actions for records coming back from the server
  receiveAllRecords: (error, data) ->
    if (error)
      #TODO: handle error
    else
      AppDispatcher.handleServerAction({
        actionType: constants.RECEIVE_ALL_RECORDS
        data: data
      })

  recordsDidUpdate: (error, data)->
    if error
      AppDispatcher.handleServerAction({
        actionType: constants.RECEIVE_RECORDS_UPDATE_ERROR
        updated: data
        })
    else
      AppDispatcher.handleServerAction({
        actionType: constants.RECEIVE_RECORDS_UPDATE_SUCCESS
        updated: data
        })
};

module.exports = RecordsActions;