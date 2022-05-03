/* eslint-disable @next/next/no-page-custom-font */
import Head from 'next/head'
import Navigation from './navigation'

function Header() {
    return (       
    <>
        <Head>          
            <meta charSet="utf-8" />
            <meta name="viewport" content="viewport-fit=cover" />
            <meta name="format-detection" content="telephone=no" />
            <title>:. Hyper Local - Justdial .:</title>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
            <link href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700;900&display=swap" rel="stylesheet" />
        </Head> 
         <style jsx>{`
         /*header css*/
         header{background-color: #fff;border-bottom: solid 1px #f2f2f2;}
         .hl_header_section{height: 60px;flex-flow: row nowrap;padding:0 20px;}
         .hl_header_left{width: 340px;justify-content: flex-start;display: flex;flex:none;}
         .hl_justdial_cell{width: 107px;}
         .justdial_logo{display: inline-block;cursor: pointer; width: 107px;height: 26px;background:url(https://akam.cdn.jdmagicbox.com/images/icontent/jdrwd/jdlogosvg.svg) no-repeat;}
         

      `}</style>
       <>
           <header>
                <div className="hl_container">
                    <div className="hl_header_section dflex">
                        <div className="hl_header_left">
                            <div className="dtbl">
                                <div className="dcell hl_justdial_cell">
                                    <span className="justdial_logo" />
                                </div>
                            </div>                
                        </div>
                    </div>
                </div>
            </header>
        </>
    </>
    )
}
  
export default Header