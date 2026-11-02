export type Product = { id:string; name:string; collection:string; price:number; image:string; category:string; apiCategory:string; color:string; wears:number; tag:string; file?:File };
export const CATALOG:Product[] = [
  {id:"linen-shirt",name:"The everyday linen shirt",collection:"The essentials",price:69,image:"/assets/linen-shirt.png",category:"Tops",apiCategory:"upper_body",color:"Oat",wears:30,tag:"EVERYDAY FAVORITE"},
  {id:"chore-jacket",name:"The easy chore jacket",collection:"Light layers",price:98,image:"/assets/chore-jacket.png",category:"Layers",apiCategory:"outerwear",color:"Olive",wears:40,tag:"A LITTLE STRUCTURE"},
  {id:"navy-knit",name:"The weekend knit",collection:"Soft essentials",price:79,image:"/assets/navy-knit.png",category:"Tops",apiCategory:"upper_body",color:"Midnight",wears:35,tag:"MADE TO REPEAT"},
  {id:"sample-outfit",name:"The statement outfit",collection:"YouCam sample",price:119,image:"/assets/sample-outfit.png",category:"Layers",apiCategory:"full_body",color:"Original",wears:15,tag:"TRY SOMETHING NEW"}
];
export function money(n:number){return new Intl.NumberFormat("en-SG",{style:"currency",currency:"SGD",currencyDisplay:"narrowSymbol",maximumFractionDigits:2,minimumFractionDigits:0}).format(n);}
export function summarize(items:Product[],budget:number){const total=items.reduce((s,p)=>s+p.price,0);return {items,total,wears:items.reduce((s,p)=>s+p.wears,0),remaining:budget-total};}

