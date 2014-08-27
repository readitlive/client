var users = {
  pk: 'id',
  headers: {
    id: 'id',
    first_name: 'First Name',
    last_name: 'Last Name',
    start_date: 'Start Date',
    end_date: 'End Date',
    roles: 'Role(s)',
    nickname: 'Nickname',
    system_id: 'System_id',
    salesforce_id: 'Salesforce_id',
    active: 'Active?'
  },
  users:  [
    {
    id : '01',
    first_name : 'Bro',
    last_name : 'Man',
    start_date : '01-02-2014',
    end_date : '01-07-2014',
    roles : 'Employee',
    nickname : 'broman',
    system_id : '1AA',
    salesforce_id : '1AA',
    active : 1,

  }, {
    id : '02',
    first_name : 'Joe',
    last_name : 'Awesome',
    start_date : '01-02-2014',
    end_date : '01-07-2014',
    roles : 'Manager',
    nickname : 'Jawesome',
    system_id : '1AB',
    salesforce_id : '1AB',
    active : 1,

  }, {
    id : '03',
    first_name : 'O',
    last_name : 'Canada',
    start_date : '01-04-2014',
    end_date : '01-07-2014',
    roles : 'CEO',
    nickname : 'Canadian',
    system_id : '1AC',
    salesforce_id : '1AC',
    active : 1,

  }, {
    id : '04',
    first_name : 'Jaws',
    last_name : 'In 3D',
    start_date : '01-01-2014',
    end_date : '01-07-2014',
    roles : 'CTO',
    nickname : 'Ahhh',
    system_id : '1AD',
    salesforce_id : '1AD',
    active : 1,
    }
  ]
};

var records = {
  pk: 'user',
  headers: {
    user: 'User',
    plan: 'Plan',
    period: 'Period',
    adjustments: 'Adjustments',
    amount: 'Amount',
    status: 'Status'
  },
  records: [ {
      user: 'bob',
      plan: 'Fixed',
      period: 'this year',
      adjustments: 'none',
      amount: '$1,000',
      status: 'paid'
    }, {
      user: 'fred',
      plan: 'Fixed',
      period: 'this year',
      adjustments: 'none',
      amount: '$3,000',
      status: 'paid'
    }, {
      user: 'greg',
      plan: 'Varies',
      period: 'this year',
      adjustments: 'none',
      amount: '$1,200',
      status: 'paid'
    }]
  };

var lineItems = [
  {
    id: 1,
    name: 'Splits',
    usedBy: {
      plans: [
        {id: 1, name: 'Account Managers'},
        {id: 2, name: 'Team Leads'}
      ],
      lineItems: [
        {id: 3, name: 'Commission at 5%'}
      ]
    },
    formula: [
      'SUM(deals.revenue) * .05'
    ],
    userAssociation: [
      { user: {
          dataObj: {id: 1, name: 'User'},
          prop: {id: 11, name:'id'}
        },
        mapsTo: {
          dataObj: {id: 2, name: 'Splits'},
          prop: {id: 22, name:'owner_id'}
        }
      },
      { user: {
          dataObj: {id: 1, name: 'User'},
          prop: {id: 12, name:'team_id'}
        },
        mapsTo: {
          dataObj: {id: 3, name: 'Deals'},
          prop: {id: 33, name:'team_id'}
        }
      }
    ]
  },
  {
    id: 2,
    name: 'Credits',
    usedBy: {
      plans: [
        {id: 1, name: 'Sales Reps'},
        {id: 2, name: 'ADM'},
        {id: 2, name: 'Account Executives'},
      ],
      lineItems: [
        {id: 1, name: 'Splits'}
      ]
    },
    formula: [
      'AVG(deals.revenue) * .05'
    ],
    userAssociation: [
      { user: {
          dataObj: {id: 1, name: 'User'},
          prop: {id: 11, name:'id'}
        },
        mapsTo: {
          dataObj: {id: 2, name: 'Credits'},
          prop: {id: 22, name:'owner_id'}
        }
      },
      { user: {
          dataObj: {id: 1, name: 'User'},
          prop: {id: 12, name:'team_id'}
        },
        mapsTo: {
          dataObj: {id: 3, name: 'Deals'},
          prop: {id: 33, name:'team_id'}
        }
      }
    ]
  },
  {
    id: 4,
    name: 'Commission at 5%',
    usedBy: {
      plans: [
        {id: 1, name: 'Leaders'},
        {id: 2, name: 'Closers'},
        {id: 2, name: 'Some Other Plan'}
      ],
      lineItems: []
    },
    formula: [
      'MEDIAN(deals.revenue) * .05'
    ],
    userAssociation: [
      { user: {
          dataObj: {id: 1, name: 'User'},
          prop: {id: 11, name:'id'}
        },
        mapsTo: {
          dataObj: {id: 2, name: 'Splits'},
          prop: {id: 22, name:'owner_id'}
        }
      },
      { user: {
          dataObj: {id: 1, name: 'User'},
          prop: {id: 12, name:'team_id'}
        },
        mapsTo: {
          dataObj: {id: 3, name: 'Deals'},
          prop: {id: 33, name:'team_id'}
        }
      }
    ]
  }
];

var loginDataFromServer = {
  user: {
    username: 'bob',
    id: 123456
  },
  token: 'a9f8134tuhiqeoriub1f398fp193buapiduvp9813yt4ipqfdp9813tp9qbjfkapuggp9h',
  exp: Date.now()
};

module.exports = {
  users: users,
  records: records,
  lineItems: lineItems,
  loginDataFromServer: loginDataFromServer
};

