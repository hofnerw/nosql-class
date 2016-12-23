// #Aggregate do volume de Twites por "hora x dia" na collection "tweets"
// #Formato do campo "created_at" : "Wed Dec 21 17:17:13 +0000 2016", na collections "tweets"
// #Tratando o campo created_at para retorno das horas

var cursor = db.tweets.find({"created_at":/2016/,});

while (cursor.hasNext()) {
 	var doc = cursor.next();
	var time = doc['created_at'].substr(0,13);
	doc['hora'] = time;
	db.tweets.update({_id: doc._id} ,{$set: {"hora": doc['hora'] } } )
}

db.tweets.aggregate([{$match:{"created_at":/2016/}} , {$group: { "_id":"$hora", "total":{$sum:1} } } ])