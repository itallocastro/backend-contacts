const app = require('./src/server')

app.listen(`${process.env.PORT || 3600}`, () => {
    console.log(
        `Back-End inicializado na porta ${process.env.PORT || 3600}`
    )
})