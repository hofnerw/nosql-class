// #Aggregate do volume de Twites por dia na collection "tweets"
// #Formato do campo "created_at" : "Wed Dec 21 17:17:13 +0000 2016", na collections "tweets"
// #Tratando o campo created_at para retorno dos dias

var cursor = db.tweets.find({"created_at":/2016/,});

while (cursor.hasNext()) {   
	var doc = cursor.next();   
	var date = doc['created_at'].substr(0,10);   
	doc['data'] = date;   
	db.tweets.update({_id: doc._id} ,{$set: {"data": doc['data'] } } ) 
}

db.tweets.aggregate([{$match:{"created_at":/2016/}} , {$group: { "_id":"$data", "total":{$sum:1} } }  ])