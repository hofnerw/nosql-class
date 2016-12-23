### Importando os módulos Tweepy, Datetime e Json
from tweepy.streaming import StreamListener
from tweepy import OAuthHandler
from tweepy import Stream
from datetime import datetime
import json, tweepy

### Parametros do usuário para conexão com o twitter
consumer_key = 'breTz3IjUaH0xyEvRY8OaAEzc'
consumer_secret = 'SNqqK1xtVXUkZHBkqwvJt3N4RFTggpqjd7RGmM3i5PXrPpj6rB'
access_token = '53087247-gCLqpWLXFu7U2w8y7IH16aEPGUw97O6rekAjXbu9G'
access_token_secret = 'WqUG7pzHdju2JIC9IhDqVyp8fWwDn59H6RqbcRn31whyD'

### Chaves de autenticação
key_auth = tweepy.OAuthHandler(consumer_key, consumer_secret)
key_auth.set_access_token(access_token, access_token_secret)

api = tweepy.API(key_auth)

### Classe para capturar os stream de dados do Twitter e armazenar no MongoDB
class listener(StreamListener):

    def __init__(self, api=None):
        super(listener,self).__init__()
        self.num_tweets = 0


    def on_data(self, dados):
     
        tweet = json.loads(dados)
        created_at = tweet["created_at"]
        id_str = tweet["id_str"]
        text = tweet["text"]
        lang = tweet["lang"]
        obj = {"created_at":created_at,"id_str":id_str,"text":text,"lang":lang}
        print (obj)
        ### loop para os 1 millão de twiters
        self.num_tweets += 1
        if self.num_tweets <= 1000000000:
            tweetind = collection.insert_one(obj).inserted_id
            return True
        else:
            return False

### Objeto ouvinte
ouvinte = listener()

### Objeto out_stream
out_stream = Stream(key_auth, listener = ouvinte)

### Importando o módulo MongoClient
from pymongo import MongoClient

### Conexão ao MongoDB
client = MongoClient('localhost', 27017)

### Criando o banco de dados twitter_db
db = client.twitter_db

### Criando a collection "collection"
collection = db.tweets

### Lista de palavras para filtrar os Tweets
track_words = ['ARVBerlin', 'Terrorism', 'Terrorismo', 'Berlin']

### Iniciando a captura e gravando os tweets no MongoDB
out_stream.filter(track = track_words)

### Encerrando o stream de dados do Twitter
out_stream.disconnect()
