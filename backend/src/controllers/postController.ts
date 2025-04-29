import {Request, Response } from "express"
//import { query } from "./../config/db"
// import { User, Post } from "./../types"
import { prisma } from "../config/db"

// CREATE
export const createPostByUser = async (req: Request, res: Response) => {

    //const { title, content, userId } = req.body;
    const { title, content } = req.body;
    // TODO: När vi har authentiserin gpå plats (JWT) ska vi hämta userId därifrån istället
    const userId = "1";

    try {

        // const userExists = await query<User[]>(
        //     "SELECT * FROM users WHERE id = ?",
        //     [userId]
        // )

        // if(userExists.length === 0) {
        //     res.status(404).json({error: "User not found"})
        //     return;
        // }
      
        // const result = await query<Post[]>(
        //     "INSERT INTO posts (title, content, user_id) VALUES (?, ?, ?)",
        //     [title, content, userId]
        // )

        const result = await prisma.post.create({
            data: {
                title: title,
                content: content,
                authorId: parseInt(userId)
            }
        })

        if(result) {
            res.status(201).json({ message: "Post created successfully", post: result})
        } else {
            res.status(400).json({error: "Post creation failed"})
        }

    } catch(error) {
        res.status(500).json({error: "Internal Server error"});

    }

};

// READ MANY
export const getPostsByUser = async (req: Request, res: Response) => {


    //const { userId } = req.body;
    // TODO: ersätt i auth-hantering

    // TODO: ersätt i auth-hantering
    const userId = "1";

    try {

        // const result = await query<Post[]>(
        //     "SELECT * FROM posts WHERE user_id = ?",
        //     [userId]
        // )

        // Lägg til paginering
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 1100;    

        const result = await prisma.post.findMany({
            where: {
                authorId: parseInt(userId)
            },
            skip: (page - 1) * limit,
            take: limit
        })

        if(result) {
            res.status(200).json({message: "Posts fetched successfully", result: result});
        } else {
            res.status(404).json({error: "Posts not found"});
        }
      

    } catch(error) {
        res.status(500).json({error: "Internal Server error"});

    }

};

// READ ONE
export const getPostByUser = async (req: Request, res: Response) => {

      const { postId } = req.params;
      const { userId } = req.body;   // TODO: ersätt i auth-hantering


    try {
    //   const result = await query<Post[]>(
    //     "SELECT * FROM posts WHERE user_id = ? AND id = ?",
    //     [userId, postId]
    //   )

        const result = await prisma.post.findUnique({
            where: {
                id: parseInt(postId),
  
            }
        })

        if(result) {
            res.status(200).json({message: "Post fetched successfully", result: result})
        } else {
            res.status(404).json({error: "Post not found"})
        }


    } catch(error) {
        res.status(500).json({error: "Internal Server error"});

    }

};

// UPDATE
export const updatePostByUser = async (req: Request, res: Response) => {


    const { postId } = req.params;
    const { title, content, userId } = req.body;   // TODO: ersätt i auth-hantering

    try {
      
        // const result = await query<Post[]>(
        //     "UPDATE posts SET title = ?, content = ? WHERE user_id = ? AND id = ?",
        //     [ title, content,  userId, postId]
        // )

        const result = await prisma.post.update({   
            where: {
                id: parseInt(postId)
            },
            data: {
                title: title,
                content: content
            }
        })

        if(result) {
            res.status(200).json({message: "Post updated successfully"})
        } else {
            res.status(404).json({error: "Post not found"})
        }

    } catch(error) {
        res.status(500).json({error: "Internal Server error"});

    }

};

// DELETE
export const deletePostByUser = async (req: Request, res: Response) => {


    const { postId } = req.params;
    const { userId } = req.body;   // TODO: ersätt i auth-hantering


    try {

        // const result = await query<Post[]>(
        //     "DELETE FROM posts WHERE user_id = ? AND id = ?",
        //     [userId, postId]
        // )

        const result = await prisma.post.delete({
            where: {
                id: parseInt(postId)
            }
        })

        if(result) {
            res.status(200).json({message: "Post deleted successfully"})
        } else {
            res.status(404).json({error: "Post not found"})
        }
        

    } catch(error) {
        res.status(500).json({error: "Internal Server error"});

    }

};