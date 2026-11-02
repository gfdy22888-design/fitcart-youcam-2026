import {apiKey,json} from "../../../lib/youcam";
export async function GET(request:Request){return json({configured:!!apiKey(request),provider:"YouCam",feature:"AI Clothes Virtual Try-On V4"});}
