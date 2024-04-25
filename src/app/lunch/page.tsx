import React, { useEffect, useState } from 'react'
const puppeteer = require('puppeteer')

export default async function page() {
    const browser = await puppeteer.launch()
    const page = await browser.newPage()
    let text: any

    try {
      await page.goto('https://optimaedu.fi/sv/info-till-dig-som-studerar-vid-optima/frukost-och-lunch-vid-optima-jakobstad/')
      text = await page.evaluate(() => Array.from(document.querySelectorAll('p'), element => element.innerText))
    } catch (error) {
      console.log(error)
      return(
      <>
        <h1 className='m-auto text-3xl'>Failed to scrape:</h1>
        <h1 className='m-auto text-3xl'>{String(error)}</h1>
      </>
    )
    }

    await browser.close()

    const index = text[32].indexOf("Onsdag");
    const index2 = text[33].indexOf("Fredag");

    const monday = text[31]
    const tuesday = text[32].substring(0, index);
    const wednesday = text[32].substring(index);
    const thursday = text[33].substring(0, index2);
    const friday = text[33].substring(index2);    

  return (
    <div className='flex flex-col w-screen h-screen justify-center items-center text-3xl'>
      <div>
        <p dangerouslySetInnerHTML={{__html: monday}}></p>
        <p dangerouslySetInnerHTML={{__html: tuesday}}></p>
        <p dangerouslySetInnerHTML={{__html: wednesday}}></p>
        <p dangerouslySetInnerHTML={{__html: thursday}}></p>
        <p dangerouslySetInnerHTML={{__html: friday}}></p>
      </div>
    </div>
  )
}
