import React from 'react'
import puppeteer from 'puppeteer'

export default async function page({params}:{params: {location: string}}) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(`https://www.ilmatieteenlaitos.fi/saa/${params.location}`);
    const tableContent = await page.$$eval('.table', tables => tables.map(table => table.innerHTML));
    await browser.close();
    return (
        <div>
            <h1>Weather in {params.location}</h1>
            <table className='table-caption' dangerouslySetInnerHTML={{__html: tableContent[0]}} />
        </div>
    )
}