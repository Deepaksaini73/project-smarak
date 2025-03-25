import { Bebas_Neue,Inter,Montserrat } from "next/font/google";


export const bebas = Bebas_Neue({
    variable: "--font-bebas",
    subsets: ["latin"],
    weight:["400"]

})

export const inter = Inter({
    variable: "--font-inter",
    subsets: ["latin"],
    weight:["400","100","200","300","500","600","700","800","900"]
})

export const montserrat = Montserrat({
    variable: "--font-montserrat",
    subsets: ["latin"],
    weight:["400","100","200","300","500","600","700","800","900"]
})