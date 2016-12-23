// #Map-Reduce dos termos mais frequentes collection "tweets"
// #...split(/\b\W+\b/) trata/define uma expressão e divide uma string em substring de uma não palavra.
// # [\b] matches backspace.
// # [\W] matches any non-word characters (short for [^a-zA-Z0-9_]).
// # [+] is short for {1,}. Matches one or more times.

// Criando a função Map

var map = function() {
  this.text.split(/\b\W+\b/).forEach(
    function(word) { emit(word, 1) }
  )
}

//Criando a função Reduce

var reduce = function reduce(key, values) {
  return values.length;
}

//Executando o Map-Reduce na collection 'tweets'

db.tweets.mapReduce(map, reduce, {out: "word_freq"})


