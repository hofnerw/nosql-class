
//Exercício 1
//Escolha 3 colegas e:
//Insira no banco informações sobre você e seus colegas como nome, data de nascimento
//disciplinas cursadas e em curso na PUC
db.Alunos.insert({
    "nome": "Willian Hofner",
    "data_nascimento":ISODate("1965-07-09"),
    "disciplinas_cursadas": [
        {disciplina: "Introdução às linguagens estaíticas"},
        {disciplina: "Ciência de dados e big data em negócios"}
    ],
    "disciplinas_em_curso": [
        {disciplina: "Banco de dados NoSQL"},
        {disciplina: "Arquitetura, qualidade e gestâo de dados"}
    ]
})
};

db.Alunos.insert({
    "nome": "Francisco",
    "data_nascimento":ISODate("1980-03-12"),
    "disciplinas_cursadas": [
        {"disciplina": "Introdução às linguagens estaíticas"},
        {"disciplina": "Ciência de dados e big data em negócios"}
    ],
    "disciplinas_em_curso": [
        {"disciplina": "Banco de dados NoSQL"},
        {"disciplina": "Arquitetura, qualidade e gestâo de dados"}
    ]
})

db.Alunos.insert({
    "nome": "João Henrique",
    "data_nascimento":ISODate("1979-05-18"),
    "disciplinas_cursadas": [
        {"disciplina": "Introdução às linguagens estaíticas"},
        {"disciplina": "Ciência de dados e big data em negócios"}
    ],
    "disciplinas_em_curso": [
        {"disciplina": "Banco de dados NoSQL"},
        {"disciplina": "Arquitetura, qualidade e gestâo de dados"}
    ]
})

//Procure no banco a pessoa com a menor data de nascimento

db.Alunos.find().sort ( {"data_nascimento": 1 }) .limit(1)

//Atualize a sua nota na disciplina NoSQL para 5

db.Alunos.updateOne(
    {"nome": "Willian Hofner"},
    {
        $set: {"disciplinas_em_curso": [
            {"disciplina": "Banco de dados NoSQL", nota: 5}
            ]}
    }   
)

//Apague um de seus colegas

db.Alunos.remove({
    "nome": /João Henrique/
})

//Pesquisa todos

db.Alunos.find()



