const Quote = require("../models/quoteModel")
const mongoose = require("mongoose")

const postQuote = async (req, res) =>{
    const { text, creator, origin } = req.body;

    try{
        const quote = await Quote.create({ text, creator, origin });



        res.status(200).json({ quote });



    }catch (error){
        res.status(400).json({ error: error.message})
    }
}

const filterUser = async (req, res)=>{
    const {username} = req.params;

    try{
        const quote = await Quote.find({creator: username}).sort({createdAt: -1})
        res.render("filtered", {quote, username, origin})
    }catch(error){
        res.status(400).json({error: error.message})
    }
}

const deleteQuote = async(req, res)=>{
    const { id }= req.params;

    console.log(id)

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({
            message: "invalid ID"
        });
    }
    try{
        const quote = await Quote.findOneAndDelete({
            _id: id
        });

        if(!quote){
            return res.status(404).json({
                message: "quote not found"
            });

        }
        res.status(200).json(quote)
    }catch(err){
        console.log(err);
        res.status(500).json({
            message: "error deleting quote"
        })
    }
}

const updateQuote = async(req, res)=>{
    const { text, id, origin  } = req.body;

    console.log(id)

    const quote = await Quote.findByIdAndUpdate({ _id: id },{text, origin})

    res.status(200).json({quote})
}


const updatePage = async(req, res)=>{
    const { id }= req.params;
    const quote = await Quote.findById(id)
    console.log(quote)
    res.render("update", {quote})
}




module.exports = { postQuote, filterUser, deleteQuote, updateQuote, updatePage }
