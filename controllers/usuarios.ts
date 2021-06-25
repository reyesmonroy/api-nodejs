import { Request, Response } from "express";
import Usuario from "../models/usuario";

export const getUsuarios = async(req: Request, res: Response) => {

  try {
    const usuarios = await Usuario.findAll();
    res.status(200).json(usuarios);
  } catch (error) {
    res.status(500).json({
      error: 'No se pudo cargar los datos'
    });
    console.log(error);
  }
  
}

export const getUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const usuario = await Usuario.findByPk(id);
    if (usuario) {
      res.status(200).json(usuario);
    } else {
      res.status(404).json({
        error: `No se contro el recurso con el id ${id}`
      });
    }
    
  } catch (error) {
    res.status(500).json({
      error: 'No se pudo cargar los datos'
    });
    console.log(error);
  }
}

export const postUsuario = async (req: Request, res: Response) => {
  const { body } = req;
  try {
    const usuario = new Usuario(body);
    await usuario.save();
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      error: 'No se pudo cargar los datos'
    });
    console.log(error);
  }
}

export const putUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  res.json({
    msg: 'putUsuario',
    body: body,
    id: id
  });
}

export const deleteUsuario = (req: Request, res: Response) => {
  const { id } = req.params;
  res.json({
    msg: 'deleteUsuario',
    id: id
  });
}