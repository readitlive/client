constants =

  # Actions - All ActionTypes starting with RECEIVE are Server Actions
  ActionTypes : {

    COMPLETE_STEP: 'COMPLETE_STEP'

    #USERS
    RECEIVE_USERS: 'RECEIVE_USERS'
    USERS_UPDATE_CELL: 'USERS_UPDATE_CELL'

    #RECORDS
    RECORDS_UPDATE_CELL: 'RECORDS_UPDATE_CELL'
    RECEIVE_ALL_RECORDS: 'RECEIVE_ALL_RECORDS'
    RECORDS_UNDO_CHANGE: 'RECORDS_UNDO_CHANGE'
    RECEIVE_RECORDS_UPDATE_SUCCESS: 'RECEIVE_RECORDS_UPDATE_SUCCESS'
    RECEIVE_RECORDS_UPDATE_ERROR: 'RECEIVE_RECORDS_UPDATE_ERROR'

    #LINE_ITEMS
    RECEIVE_LINE_ITEMS: 'RECEIVE_LINE_ITEMS'
    LINE_ITEMS_UPDATE_FIELD: 'LINE_ITEMS_UPDATE_FIELD'
    LINE_ITEMS_UNDO_CHANGE: 'LINE_ITEMS_UNDO_CHANGE'
    RECEIVE_LINE_ITEMS_UPDATE_SUCCESS: 'RECEIVE_LINE_ITEMS_UPDATE_SUCCESS'
    RECEIVE_LINE_ITEMS_UPDATE_ERROR: 'RECEIVE_LINE_ITEMS_UPDATE_ERROR'

    RECEIVE_LOGIN_USER: 'RECEIVE_LOGIN_USER'
    LOGOUT_USER: 'LOGOUT_USER'

  }

  ADMIN_STEPS: [
    {text: "Basic Information"}
    {text: "Billing"}
  ]

  ACCOUNT_SETTINGS_STEPS: [
    {text: "Basic Information"}
    {text: "Billing"}
  ]

  # Routes
  BASE_URL_PREFIX: "#"

  HOME_NAVIGATION_CHOICES: [
    {text: "Users", path: "/users", icon: 'user'}
    {text: "Plans", path: "/plans", icon: 'clock-o'}
    {text: "Account Settings", path: "/account", icon: 'cog'}
    {text: "Plan Data", path: "/plan-data", icon: 'file'}
    {text: "Administrator", path: "/admin", icon: 'lock'}
    {text: "Records", path: "/records", icon: 'pencil'}
    {text: "Line Items", path: "/line-items", icon: 'list'}
  ]

  UNSAVED: 'UNSAVED'
  SAVE_PENDING: 'SAVE_PENDING'



  SAVED: 'SAVED'



module.exports = constants
