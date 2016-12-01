
//Exercício
//Faça uma pesquisa simples na coleção Vocabulary pelo termo “feliz” no campo
//text e diga:


db.Vocabulary.find({text: "feliz"}).explain({"executionStats":1})

//retorno na tela do shell apos executar comando de pesquisa acima
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "nosqlclass.Vocabulary",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"text" : {
				"$eq" : "feliz"
			}
		},
		"winningPlan" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"text" : {
					"$eq" : "feliz"
				}
			},
			"direction" : "forward"
		},
		"rejectedPlans" : [ ]
	},
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 1,
		"executionTimeMillis" : 184,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 291214,
		"executionStages" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"text" : {
					"$eq" : "feliz"
				}
			},
			"nReturned" : 1,
			"executionTimeMillisEstimate" : 140,
			"works" : 291216,
			"advanced" : 1,
			"needTime" : 291214,
			"needYield" : 0,
			"saveState" : 2275,
			"restoreState" : 2275,
			"isEOF" : 1,
			"invalidates" : 0,
			"direction" : "forward",
			"docsExamined" : 291214
		},
		"allPlansExecution" : [ ]
	},
	"serverInfo" : {
		"host" : "virtualbox",
		"port" : 27017,
		"version" : "3.2.10",
		"gitVersion" : "79d9b3ab5ce20f51c272b4411202710a082d0317"
	},
	"ok" : 1
}

//A) Número de documentos que foi escaneado
//"totalDocsExamined" : 291214


//B) Tempo que levou para fazer a consulta
//"executionTimeMillis" : 184

//C) Crie um índice simples no campo text
db.Vocabulary.createIndex({"text": 1}, {expireAfterSeconds: 3600})

//retorno na tela do shell após criar indice no campo text
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}


//
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "nosqlclass.Vocabulary",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"text" : {
				"$eq" : "feliz"
			}
		},
		"winningPlan" : {
			"stage" : "FETCH",
			"inputStage" : {
				"stage" : "IXSCAN",
				"keyPattern" : {
					"text" : 1
				},
				"indexName" : "text_1",
				"isMultiKey" : false,
				"isUnique" : false,
				"isSparse" : false,
				"isPartial" : false,
				"indexVersion" : 1,
				"direction" : "forward",
				"indexBounds" : {
					"text" : [
						"[\"feliz\", \"feliz\"]"
					]
				}
			}
		},
		"rejectedPlans" : [ ]
	},
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 1,
		"executionTimeMillis" : 43,
		"totalKeysExamined" : 1,
		"totalDocsExamined" : 1,
		"executionStages" : {
			"stage" : "FETCH",
			"nReturned" : 1,
			"executionTimeMillisEstimate" : 0,
			"works" : 2,
			"advanced" : 1,
			"needTime" : 0,
			"needYield" : 0,
			"saveState" : 0,
			"restoreState" : 0,
			"isEOF" : 1,
			"invalidates" : 0,
			"docsExamined" : 1,
			"alreadyHasObj" : 0,
			"inputStage" : {
				"stage" : "IXSCAN",
				"nReturned" : 1,
				"executionTimeMillisEstimate" : 0,
				"works" : 2,
				"advanced" : 1,
				"needTime" : 0,
				"needYield" : 0,
				"saveState" : 0,
				"restoreState" : 0,
				"isEOF" : 1,
				"invalidates" : 0,
				"keyPattern" : {
					"text" : 1
				},
				"indexName" : "text_1",
				"isMultiKey" : false,
				"isUnique" : false,
				"isSparse" : false,
				"isPartial" : false,
				"indexVersion" : 1,
				"direction" : "forward",
				"indexBounds" : {
					"text" : [
						"[\"feliz\", \"feliz\"]"
					]
				},
				"keysExamined" : 1,
				"dupsTested" : 0,
				"dupsDropped" : 0,
				"seenInvalidated" : 0
			}
		},
		"allPlansExecution" : [ ]
	},
	"serverInfo" : {
		"host" : "virtualbox",
		"port" : 27017,
		"version" : "3.2.10",
		"gitVersion" : "79d9b3ab5ce20f51c272b4411202710a082d0317"
	},
	"ok" : 1
}

//D) Número de documentos que foi escaneado
// "docsExamined" : 1


//E) Tempo que levou para fazer a consulta
// "executionTimeMillis" : 43






