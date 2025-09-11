import express from 'express'

const app=express()

/*
Challenge:
    1. Use express.static() to serve all the files in 'public'.
*/


const PORT=8000

app.use(express.static('public'))



app.listen(PORT,()=>{
    console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  console.error('Failed to start server:', err)
}) 