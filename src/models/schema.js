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
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "AWSEmail",
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
                    "type": "key",
                    "properties": {
                        "name": "userByEmail",
                        "fields": [
                            "email"
                        ],
                        "queryField": "userByEmail"
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
                        "associatedWith": "realEstate"
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
                        "associatedWith": "realEstate"
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
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
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
                        "model": "RealEstate"
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
                "budgetLineDeadline": {
                    "name": "budgetLineDeadline",
                    "isArray": true,
                    "type": {
                        "model": "BudgetLineDeadline"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "isArrayNullable": true,
                    "association": {
                        "connectionType": "HAS_MANY",
                        "associatedWith": "bankMouvement"
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
                        ],
                        "queryField": "getBankMovementByBankAccountId"
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
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bankMovementByBiId",
                        "fields": [
                            "biId"
                        ],
                        "queryField": "listBankMovementByBiId"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
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
                        "associatedWith": "bankAccount"
                    }
                },
                "bank": {
                    "name": "bank",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "accountOwner": {
                    "name": "accountOwner",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "name": {
                    "name": "name",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "iban": {
                    "name": "iban",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
                    "attributes": []
                },
                "bic": {
                    "name": "bic",
                    "isArray": false,
                    "type": "String",
                    "isRequired": false,
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
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "bankAccountByBiConnectionId",
                        "fields": [
                            "biConnectionId"
                        ],
                        "queryField": "listBankAccountByBiConnectionId"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
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
                    "properties": {}
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
                        ],
                        "queryField": "listRealEstatesByBankAccount"
                    }
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
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
                "bankMouvement": {
                    "name": "bankMouvement",
                    "isArray": false,
                    "type": {
                        "model": "BankMovement"
                    },
                    "isRequired": false,
                    "attributes": [],
                    "association": {
                        "connectionType": "BELONGS_TO",
                        "targetName": "bankMouvementId"
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
                    "type": "key",
                    "properties": {
                        "name": "budgetLineDeadlineByBankMovement",
                        "fields": [
                            "bankMouvementId",
                            "date"
                        ]
                    }
                },
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
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
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
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
                },
                {
                    "type": "auth",
                    "properties": {
                        "rules": [
                            {
                                "allow": "private",
                                "operations": [
                                    "create",
                                    "update",
                                    "delete",
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
                                "ownerField": "userId",
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
                                "ownerField": "userId",
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
        "NotificationReceipts": {
            "name": "NotificationReceipts",
            "fields": {
                "id": {
                    "name": "id",
                    "isArray": false,
                    "type": "ID",
                    "isRequired": true,
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
                "expoToken": {
                    "name": "expoToken",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
                    "attributes": []
                },
                "receiptId": {
                    "name": "receiptId",
                    "isArray": false,
                    "type": "String",
                    "isRequired": true,
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
            "pluralName": "NotificationReceipts",
            "attributes": [
                {
                    "type": "model",
                    "properties": {}
                },
                {
                    "type": "key",
                    "properties": {
                        "name": "notificationReceiptsByUser",
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
                                "ownerField": "userId",
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
                },
                "notificationParams": {
                    "name": "notificationParams",
                    "isArray": false,
                    "type": {
                        "nonModel": "NotificationParams"
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
        "NotificationParams": {
            "name": "NotificationParams",
            "fields": {
                "echeanceFacture": {
                    "name": "echeanceFacture",
                    "isArray": false,
                    "type": {
                        "nonModel": "NotificationParam"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "loyer": {
                    "name": "loyer",
                    "isArray": false,
                    "type": {
                        "nonModel": "NotificationParam"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "debitBancaire": {
                    "name": "debitBancaire",
                    "isArray": false,
                    "type": {
                        "nonModel": "NotificationParam"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "creditBancaire": {
                    "name": "creditBancaire",
                    "isArray": false,
                    "type": {
                        "nonModel": "NotificationParam"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "soldeNegatif": {
                    "name": "soldeNegatif",
                    "isArray": false,
                    "type": {
                        "nonModel": "NotificationParam"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "retardLoyer": {
                    "name": "retardLoyer",
                    "isArray": false,
                    "type": {
                        "nonModel": "NotificationParam"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "mauvaiseRenta": {
                    "name": "mauvaiseRenta",
                    "isArray": false,
                    "type": {
                        "nonModel": "NotificationParam"
                    },
                    "isRequired": false,
                    "attributes": []
                },
                "autre": {
                    "name": "autre",
                    "isArray": false,
                    "type": {
                        "nonModel": "NotificationParam"
                    },
                    "isRequired": false,
                    "attributes": []
                }
            }
        },
        "NotificationParam": {
            "name": "NotificationParam",
            "fields": {
                "push": {
                    "name": "push",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
                    "attributes": []
                },
                "email": {
                    "name": "email",
                    "isArray": false,
                    "type": "Boolean",
                    "isRequired": false,
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
    "version": "fdbc53f9a9e0891cdf0ce68d3df61d2e"
};