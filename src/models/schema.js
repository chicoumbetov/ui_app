export const schema = {
    "models": {
        "User": {
            "name": "User",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "lastname": {
                    "name": "lastname",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "firstname": {
                    "name": "firstname",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "AWSEmail",
                    "isRequired": false,
                    "attributes": []
                },
                "phoneNumber": {
                    "name": "phoneNumber",
                    "isArray": false,
                    "type": "AWSPhone",
                    "isRequired": false,
                    "attributes": []
                },
                "optIn": {
                    "name": "optIn",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "address": {
                    "name": "address",
                    "isArray": false,
                    "type": {
                        "nonModel": "Address"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "avatarUri": {
                    "name": "avatarUri",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "birthDate": {
                    "name": "birthDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "subscription": {
                    "name": "subscription",
                    "isArray": false,
                    "type": {
                        "enum": "SubscriptionType"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Users",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "id",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            },
                            {
                                "allow": "private",
                                "operations": [
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "RealEstate": {
            "name": "RealEstate",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "iconUri": {
                    "name": "iconUri",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "purchaseYear": {
                    "name": "purchaseYear",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "RealEstateType"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "ownName": {
                    "name": "ownName",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "company": {
                    "name": "company",
                    "isArray": false,
                    "type": {
                        "enum": "CompanyType"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "detentionPart": {
                    "name": "detentionPart",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "typeImpot": {
                    "name": "typeImpot",
                    "isArray": false,
                    "type": {
                        "enum": "TaxType"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "budgetLines": {
                    "name": "budgetLines",
                    "isArray": true,
                    "type": {
                        "model": "BudgetLine"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "id"
                    }
                },
                "documents": {
                    "name": "documents",
                    "isArray": true,
                    "type": {
                        "model": "Document"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "id"
                    }
                },
                "admins": {
                    "name": "admins",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": false
                },
                "shared": {
                    "name": "shared",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "pendingInvitations": {
                    "name": "pendingInvitations",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "address": {
                    "name": "address",
                    "isArray": false,
                    "type": {
                        "nonModel": "Address"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "tenants": {
                    "name": "tenants",
                    "isArray": true,
                    "type": {
                        "nonModel": "TenantInfo"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "bankAccounts": {
                    "name": "bankAccounts",
                    "isArray": true,
                    "type": {
                        "model": "RealEstateBankAccount"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "id"
                    }
                }
            },
            "syncable": true,
            "pluralName": "RealEstates",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "admins",
                                "allow": "owner",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            },
                            {
                                "provider": "userPools",
                                "ownerField": "shared",
                                "allow": "owner",
                                "operations": [
                                    "read"
                                ],
                                "identityClaim": "cognito:username"
                            }
                        ]
                    }
                }
            ]
        },
        "BudgetLine": {
            "name": "BudgetLine",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "realEstate": {
                    "name": "realEstate",
                    "isArray": false,
                    "type": {
                        "model": "RealEstate"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "realEstateId"
                    }
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "BudgetLineType"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "category": {
                    "name": "category",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "amount": {
                    "name": "amount",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "frequency": {
                    "name": "frequency",
                    "isArray": false,
                    "type": {
                        "enum": "Frequency"
                    },
                    "isRequired": true,
                    "attributes": []
                },
                "nextDueDate": {
                    "name": "nextDueDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "infoCredit": {
                    "name": "infoCredit",
                    "isArray": false,
                    "type": {
                        "nonModel": "MortgageLoanInfo"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "BudgetLines",
            "attributes": [
                {
                    "type": "key",
                    "properties": {
                        "name": "budgetLineByRealEstate",
                        "fields": [
                            "realEstateId"
                        ]
                    }
                },
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "Document": {
            "name": "Document",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "realEstate": {
                    "name": "realEstate",
                    "isArray": false,
                    "type": {
                        "model": "RealEstate"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "realEstateId"
                    }
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "s3file": {
                    "name": "s3file",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Documents",
            "attributes": [
                {
                    "type": "key",
                    "properties": {
                        "name": "documentByRealEstate",
                        "fields": [
                            "realEstateId"
                        ]
                    }
                },
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "RealEstateBankAccount": {
            "name": "RealEstateBankAccount",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "realEstate": {
                    "name": "realEstate",
                    "isArray": false,
                    "type": {
                        "model": "RealEstate"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "realEstateId"
                    }
                },
                "bankAccount": {
                    "name": "bankAccount",
                    "isArray": false,
                    "type": {
                        "model": "BankAccount"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "bankAccountId"
                    }
                }
            },
            "syncable": true,
            "pluralName": "RealEstateBankAccounts",
            "attributes": [
                {
                    "type": "model",
                    "properties": {
                        "queries": null
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bankAccountByRealEstate",
                        "fields": [
                            "realEstateId",
                            "bankAccountId"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "realEstateByBankAccount",
                        "fields": [
                            "bankAccountId",
                            "realEstateId"
                        ]
                    }
                }
            ]
        },
        "BankAccount": {
            "name": "BankAccount",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "realEstates": {
                    "name": "realEstates",
                    "isArray": true,
                    "type": {
                        "model": "RealEstateBankAccount"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "id"
                    }
                },
                "bank": {
                    "name": "bank",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "accountOwner": {
                    "name": "accountOwner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "iban": {
                    "name": "iban",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "bic": {
                    "name": "bic",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "balance": {
                    "name": "balance",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "bridgetApiAccountId": {
                    "name": "bridgetApiAccountId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "movements": {
                    "name": "movements",
                    "isArray": true,
                    "type": {
                        "model": "BankMovement"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "id"
                    }
                }
            },
            "syncable": true,
            "pluralName": "BankAccounts",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "BankMovement": {
            "name": "BankMovement",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "bankAccount": {
                    "name": "bankAccount",
                    "isArray": false,
                    "type": {
                        "model": "BankAccount"
                    },
                    "isRequired": true,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "bankAccountId"
                    }
                },
                "realEstate": {
                    "name": "realEstate",
                    "isArray": false,
                    "type": {
                        "model": "BankAccount"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "realEstateId"
                    }
                },
                "bridgetApiId": {
                    "name": "bridgetApiId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "description": {
                    "name": "description",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "amount": {
                    "name": "amount",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "budgetLineId": {
                    "name": "budgetLineId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "budgetLine": {
                    "name": "budgetLine",
                    "isArray": false,
                    "type": {
                        "model": "BudgetLine"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "budgetLineId"
                    }
                },
                "ignored": {
                    "name": "ignored",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "date": {
                    "name": "date",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "BankMovements",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bankMovementByByBankAccount",
                        "fields": [
                            "bankAccountId"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bankMovementByBudgetLine",
                        "fields": [
                            "budgetLineId"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bankMovementByRealEstate",
                        "fields": [
                            "realEstateId"
                        ]
                    }
                }
            ]
        },
        "Notification": {
            "name": "Notification",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "userId": {
                    "name": "userId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "user": {
                    "name": "user",
                    "isArray": false,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "userId"
                    }
                },
                "category": {
                    "name": "category",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "text": {
                    "name": "text",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "params": {
                    "name": "params",
                    "isArray": false,
                    "type": "AWSJSON",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "Notifications",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "notificationByUser",
                        "fields": [
                            "userId"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        },
        "BillingHistory": {
            "name": "BillingHistory",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "owner": {
                    "name": "owner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "userId": {
                    "name": "userId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "user": {
                    "name": "user",
                    "isArray": false,
                    "type": {
                        "model": "User"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "userId"
                    }
                },
                "date": {
                    "name": "date",
                    "isArray": false,
                    "type": "AWSDateTime",
                    "isRequired": true,
                    "attributes": []
                },
                "nextRenewDate": {
                    "name": "nextRenewDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "subscription": {
                    "name": "subscription",
                    "isArray": false,
                    "type": {
                        "enum": "SubscriptionType"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "amount": {
                    "name": "amount",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "paid": {
                    "name": "paid",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "BillingHistories",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "billingHistoryByUser",
                        "fields": [
                            "userId"
                        ]
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "provider": "userPools",
                                "ownerField": "owner",
                                "allow": "owner",
                                "identityClaim": "cognito:username",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
                                    "read"
                                ]
                            }
                        ]
                    }
                }
            ]
        }
    },
    "enums": {
        "SubscriptionType": {
            "name": "SubscriptionType",
            "values": [
                "OneToTwo",
                "TreeToFive",
                "MoreThanFive"
            ]
        },
        "RealEstateType": {
            "name": "RealEstateType",
            "values": [
                "mainHome",
                "secondHome",
                "professionnalRentalInvestment",
                "privateRentalInvestment"
            ]
        },
        "CompanyType": {
            "name": "CompanyType",
            "values": [
                "SCI",
                "SAS",
                "SARLclassique",
                "SARLfamille"
            ]
        },
        "TaxType": {
            "name": "TaxType",
            "values": [
                "RevenueTax",
                "SocialTax"
            ]
        },
        "BudgetLineType": {
            "name": "BudgetLineType",
            "values": [
                "Expense",
                "Income"
            ]
        },
        "Frequency": {
            "name": "Frequency",
            "values": [
                "monthly",
                "fortnightly",
                "quarterly",
                "annual"
            ]
        },
        "InvitationType": {
            "name": "InvitationType",
            "values": [
                "Admin",
                "ReadOnly"
            ]
        }
    },
    "nonModels": {
        "Address": {
            "name": "Address",
            "fields": {
                "address": {
                    "name": "address",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "additionalAddress": {
                    "name": "additionalAddress",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "postalCode": {
                    "name": "postalCode",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "city": {
                    "name": "city",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "country": {
                    "name": "country",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                }
            }
        },
        "MortgageLoanInfo": {
            "name": "MortgageLoanInfo",
            "fields": {
                "borrowedCapital": {
                    "name": "borrowedCapital",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "loadStartDate": {
                    "name": "loadStartDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "duration": {
                    "name": "duration",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": false,
                    "attributes": []
                },
                "interestRate": {
                    "name": "interestRate",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "assuranceRate": {
                    "name": "assuranceRate",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "amortizationTable": {
                    "name": "amortizationTable",
                    "isArray": true,
                    "type": {
                        "nonModel": "AmortizationTable"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true
                }
            }
        },
        "AmortizationTable": {
            "name": "AmortizationTable",
            "fields": {
                "dueDate": {
                    "name": "dueDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "amount": {
                    "name": "amount",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "interest": {
                    "name": "interest",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "assurance": {
                    "name": "assurance",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "amortizedCapital": {
                    "name": "amortizedCapital",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "TenantInfo": {
            "name": "TenantInfo",
            "fields": {
                "amount": {
                    "name": "amount",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": true,
                    "attributes": []
                },
                "rentalCharges": {
                    "name": "rentalCharges",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "managementFees": {
                    "name": "managementFees",
                    "isArray": false,
                    "type": "Float",
                    "isRequired": false,
                    "attributes": []
                },
                "lastname": {
                    "name": "lastname",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "firstname": {
                    "name": "firstname",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "AWSEmail",
                    "isRequired": true,
                    "attributes": []
                },
                "startDate": {
                    "name": "startDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": true,
                    "attributes": []
                },
                "endDate": {
                    "name": "endDate",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "PendingInvitation": {
            "name": "PendingInvitation",
            "fields": {
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "type": {
                    "name": "type",
                    "isArray": false,
                    "type": {
                        "enum": "InvitationType"
                    },
                    "isRequired": true,
                    "attributes": []
                }
            }
        }
    },
    "version": "4295f587d20897bfb4e2c5f8fca12ceb"
};