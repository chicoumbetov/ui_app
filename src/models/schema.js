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
                "avatarUri": {
                    "name": "avatarUri",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "privateProfile": {
                    "name": "privateProfile",
                    "isArray": false,
                    "type": {
                        "nonModel": "ProfileInfo"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "expoToken": {
                    "name": "expoToken",
                    "isArray": true,
                    "type": "String",
                    "isRequired": true,
                    "attributes": [],
                    "isArrayNullable": true
                },
                "biUser": {
                    "name": "biUser",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "biToken": {
                    "name": "biToken",
                    "isArray": false,
                    "type": "String",
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
                    "type": "key",
                    "properties": {
                        "name": "userByBiUser",
                        "fields": [
                            "biUser"
                        ],
                        "queryField": "userByBiUser"
                    }
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
                            },
                            {
                                "allow": "private",
                                "provider": "iam",
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
                        "associatedWith": "realEstate"
                    }
                },
                "bankMovements": {
                    "name": "bankMovements",
                    "isArray": true,
                    "type": {
                        "model": "BankMovement"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "realEstate"
                    }
                },
                "budgetLineDeadlines": {
                    "name": "budgetLineDeadlines",
                    "isArray": true,
                    "type": {
                        "model": "BudgetLineDeadline"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "realEstate"
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
                        "associatedWith": "realEstate"
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
                    "type": {
                        "model": "PendingInvitation"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "id"
                    }
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
                },
                "tenantId": {
                    "name": "tenantId",
                    "isArray": false,
                    "type": "String",
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
                "biId": {
                    "name": "biId",
                    "isArray": false,
                    "type": "Int",
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
                "budgetLineDeadlineId": {
                    "name": "budgetLineDeadlineId",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
                    "attributes": []
                },
                "budgetLineDeadline": {
                    "name": "budgetLineDeadline",
                    "isArray": false,
                    "type": {
                        "model": "BudgetLineDeadline"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "HAS_ONE",
                        "associatedWith": "id",
                        "targetName": "budgetLineDeadlineId"
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
                        "name": "bankMovementByBankAccount",
                        "fields": [
                            "bankAccountId",
                            "date"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bankMovementByBudgetLineDeadline",
                        "fields": [
                            "budgetLineDeadlineId",
                            "date"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bankMovementByRealEstate",
                        "fields": [
                            "realEstateId",
                            "date"
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
                "biId": {
                    "name": "biId",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "biConnectionId": {
                    "name": "biConnectionId",
                    "isArray": false,
                    "type": "Int",
                    "isRequired": true,
                    "attributes": []
                },
                "biState": {
                    "name": "biState",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
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
                        "associatedWith": "bankAccount"
                    }
                }
            },
            "syncable": true,
            "pluralName": "BankAccounts",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bankAccountByBiId",
                        "fields": [
                            "biId"
                        ],
                        "queryField": "listBankAccountByBiId"
                    }
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
        "BudgetLineDeadline": {
            "name": "BudgetLineDeadline",
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
                "date": {
                    "name": "date",
                    "isArray": false,
                    "type": "AWSDate",
                    "isRequired": false,
                    "attributes": []
                },
                "infoCredit": {
                    "name": "infoCredit",
                    "isArray": false,
                    "type": {
                        "nonModel": "MortgageLoanDeadlineInfo"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "tenantId": {
                    "name": "tenantId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                }
            },
            "syncable": true,
            "pluralName": "BudgetLineDeadlines",
            "attributes": [
                {
                    "type": "key",
                    "properties": {
                        "name": "budgetLineDeadlineByRealEstate",
                        "fields": [
                            "realEstateId",
                            "date"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "budgetLineDeadlineByBudgetLine",
                        "fields": [
                            "budgetLineId",
                            "date"
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
                "key": {
                    "name": "key",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
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
                    "type": "key",
                    "properties": {
                        "name": "documentByKey",
                        "fields": [
                            "key"
                        ],
                        "queryField": "documentByKey"
                    }
                },
                {
                    "type": "model",
                    "properties": {}
                }
            ]
        },
        "PendingInvitation": {
            "name": "PendingInvitation",
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
            },
            "syncable": true,
            "pluralName": "PendingInvitations",
            "attributes": [
                {
                    "type": "key",
                    "properties": {
                        "name": "pendingInvitationByRealEstate",
                        "fields": [
                            "realEstateId"
                        ]
                    }
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "pendingInvitationByEmail",
                        "fields": [
                            "email"
                        ],
                        "queryField": "pendingInvitationByEmail"
                    }
                },
                {
                    "type": "model",
                    "properties": {}
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
                },
                "createdAt": {
                    "name": "createdAt",
                    "isArray": false,
                    "type": "AWSDateTime",
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
                            "userId",
                            "createdAt"
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
                            "userId",
                            "date"
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
        "ProfileInfo": {
            "name": "ProfileInfo",
            "fields": {
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
            }
        },
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
        "MortgageLoanDeadlineInfo": {
            "name": "MortgageLoanDeadlineInfo",
            "fields": {
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
                }
            }
        },
        "TenantInfo": {
            "name": "TenantInfo",
            "fields": {
                "id": {
                    "name": "id",
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
        }
    },
    "version": "d4bbb35471cc26ab6ff544f7cbcf5fa5"
};