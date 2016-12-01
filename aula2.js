//Exercício 1
//Na coleção Vocabulary
//A) Utilizando as funções de mapReduce do mongo, conte o número de
//palavras que terminam em ar, er, ir, or, ur.

//Função map
var map = function(){
    emit(this.text.substring(this.text.length-2,this.text.length),1);
}

//Função reduce
var reduce = function(key, values){
    return Array.sum(values);
}

//executando o mapredue para contar os carcteres passados
db.Vocabulary.mapReduce(map,reduce,{query:
{
        text:  /((ar)|(er)|(ir)|(or)|(ur))$/
}
 , out:"resultado"})

//retorno na tela do shell após executar o mapReduce
{
	"result" : "resultado",
	"timeMillis" : 916,
	"counts" : {
		"input" : 7302,
		"emit" : 7302,
		"reduce" : 361,
		"output" : 5
	},
	"ok" : 1
}

db.resultado.find()
//retorno na tela do shell após executar o db.result.find
{ "_id" : "ar", "value" : 2950 }
{ "_id" : "er", "value" : 2342 }
{ "_id" : "ir", "value" : 554 }
{ "_id" : "or", "value" : 1168 }
{ "_id" : "ur", "value" : 288 }

//B) Utilizando as funções de mapReduce do mongo, conte o total de cada
//caracter existente no vocabulario. Por exemplo:
//aula -> a:2, u:1, l:1

//Para facilitar você pode escrever o código em um documento de texto e
//importa-lo usando a função load() do mongo shell
//Ex.: > load(“/home/nosql/Aulas/nosql-class/aula3/ex1.js”)

//Função mp
var map = function() {
    if (this.text == undefined) return;

    for (var i = 0; i < this.text.length; i++) {
        emit(this.text[i], 1);
    }
};

//Função reduce
var reduce = function(key, value) {
    return Array.sum(value);
};

//Executando a função mapReduce na coleção Vocabulary
var result = db.Vocabulary.mapReduce(
        map, 
        reduce, 
        {
            query: {},
            out: "contar"
        }
    );

//imprimindo
printjson(result);
//retorno no shell após printjson
{
	"result" : "contar",
	"timeMillis" : 14867,
	"counts" : {
		"input" : 291214,
		"emit" : 3905842,
		"reduce" : 125037,
		"output" : 61
	},
	"ok" : 1
}


//contar os caracteres
var cursor = db.contar.find({});
while (cursor.hasNext()) {
    printjson(cursor.next())
}

//retorno shell após executar o db.contar.find
{ "_id" : "!", "value" : 344 }
{ "_id" : "#", "value" : 11110 }
{ "_id" : "$", "value" : 220 }
{ "_id" : "%", "value" : 127 }
{ "_id" : "&", "value" : 2 }
{ "_id" : "(", "value" : 6 }
{ "_id" : ")", "value" : 8 }
{ "_id" : "*", "value" : 7 }
{ "_id" : ",", "value" : 58 }
{ "_id" : "-", "value" : 17 }
{ "_id" : ".", "value" : 83708 }
{ "_id" : "/", "value" : 241469 }
{ "_id" : "0", "value" : 21943 }
{ "_id" : "1", "value" : 24276 }
{ "_id" : "2", "value" : 20777 }
{ "_id" : "3", "value" : 17791 }
{ "_id" : "4", "value" : 16930 }
{ "_id" : "5", "value" : 16626 }
{ "_id" : "6", "value" : 16037 }
{ "_id" : "7", "value" : 16950 }
{ "_id" : "8", "value" : 16111 }
{ "_id" : "9", "value" : 17718 }
{ "_id" : ":", "value" : 130977 }
{ "_id" : ";", "value" : 701 }
{ "_id" : "<", "value" : 57 }
{ "_id" : "=", "value" : 155 }
{ "_id" : ">", "value" : 76 }
{ "_id" : "?", "value" : 13074 }
{ "_id" : "@", "value" : 90009 }
{ "_id" : "[", "value" : 1009 }
{ "_id" : "\\", "value" : 70 }
{ "_id" : "]", "value" : 1225 }
{ "_id" : "^", "value" : 21 }
{ "_id" : "_", "value" : 25413 }
{ "_id" : "`", "value" : 45 }
{ "_id" : "a", "value" : 288288 }
{ "_id" : "b", "value" : 64116 }
{ "_id" : "c", "value" : 174545 }
{ "_id" : "d", "value" : 91114 }
{ "_id" : "e", "value" : 186273 }
{ "_id" : "f", "value" : 53056 }
{ "_id" : "g", "value" : 60855 }
{ "_id" : "h", "value" : 150811 }
{ "_id" : "i", "value" : 172221 }
{ "_id" : "j", "value" : 41956 }
{ "_id" : "k", "value" : 50996 }
{ "_id" : "l", "value" : 114093 }
{ "_id" : "m", "value" : 90167 }
{ "_id" : "n", "value" : 129568 }
{ "_id" : "o", "value" : 252402 }
{ "_id" : "p", "value" : 145352 }
{ "_id" : "q", "value" : 32703 }
{ "_id" : "r", "value" : 157747 }
{ "_id" : "s", "value" : 221626 }
{ "_id" : "t", "value" : 345977 }
{ "_id" : "u", "value" : 90389 }
{ "_id" : "v", "value" : 54429 }
{ "_id" : "w", "value" : 34121 }
{ "_id" : "x", "value" : 34814 }
{ "_id" : "y", "value" : 42249 }
{ "_id" : "z", "value" : 40907 }

// fechar cursor
cursor.close();

//Exercício 2
//Utilizando a função de agregação contar quantos itens cujo o campo total seja
//maior do que 1000, agrupando-os por tipo, (campo type) e exiba o resultado em
//ordem crescente.

var resultado = db.Vocabulary.aggregate([
        { $match: { total: { $gt: 1000 } } },
        {
            $group: {
                _id: { type: "$type" },
                qty: { $sum: 1 }
            }
        },
        { $sort: { "_id.type": 1 } }
    ]);

resultado.pretty();

//retorno no shell após execução do resultado.pretty
{ "_id" : { "type" : 1 }, "qty" : 1 }
{ "_id" : { "type" : 3 }, "qty" : 2 }
{ "_id" : { "type" : 4 }, "qty" : 12 }
{ "_id" : { "type" : 5 }, "qty" : 744 }
{ "_id" : { "type" : 6 }, "qty" : 2 }
{ "_id" : { "type" : 8 }, "qty" : 6 }
{ "_id" : { "type" : 9 }, "qty" : 5 }

//fechar
resultado.close();


