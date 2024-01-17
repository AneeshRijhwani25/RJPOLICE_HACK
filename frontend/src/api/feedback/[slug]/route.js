import { NextResponse } from 'next/server'

export const GET = async (req, {params}) => {
    const {slug} = params
    console.log(slug)
    
    try{
        const res = await fetch(`http://localhost:3000/fir/${slug}`);

        if (!res.ok) {
          throw new Error("Failed to fetch data");
        }

        
        return new NextResponse(JSON.stringify(
            res,
            { status: 200 }
        ))
    } catch (err) {
        console.log(err)
        return new NextResponse(JSON.stringify({
            message: "Something went wrong!"
        },
            { status: 500 }
        ))
    }
}





