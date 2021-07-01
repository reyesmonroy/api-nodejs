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
      return res.status(200).json(usuario);
    } 
    res.status(404).json({
      error: `No se contro el recurso con el id ${id}`
    });
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
    const existeEmail = await Usuario.findOne({
      where: {
        email: body.email
      }
    });
    if (existeEmail) {
      return res.status(400).json({
        error: 'Ya existe un usuario con el mismo email' + body.email
      });
    }

    const usuario = await Usuario.create(body);
    res.status(201).json(usuario);
  } catch (error) {
    res.status(500).json({
      error: 'No se pudo crear el usuario'
    });
    console.log(error);
  }
}

export const putUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      res.status(404).json({
        error: `No existe un usuario con el id ${id}`
      });
    }

    await usuario?.update(body);
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      error: 'No se actualizaron los datos'
    });
    console.log(error);
  }
}

export const deleteUsuario = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { body } = req;
  try {
    const usuario = await Usuario.findByPk(id);
    if (!usuario) {
      res.status(404).json({
        error: `No existe un usuario con el id ${id}`
      });
    }

    await usuario?.update({
      estado: false
    });
    res.status(200).json(usuario);
  } catch (error) {
    res.status(500).json({
      error: 'No se eliminarion los datos'
    });
    console.log(error);
  }
}