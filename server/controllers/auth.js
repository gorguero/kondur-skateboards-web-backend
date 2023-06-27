import { response } from "express";


const login = (req, res=response) => {

    res.status(200).json({
        msg: 'Logueado papss'
    })

}

export {
    login
}