import React from 'react';
import Layout from './Layout';
import Link from "next/link";

const Pagination = ({finalPage, currPage, nextPage, prevPage, rangeStart, rangeEnd, /*handlePageChange*/}:{finalPage:number, currPage:number, nextPage:number, prevPage:number, rangeStart:number, rangeEnd:number, /*handlePageChange: (x:number) => void*/}) => {
    let pages = [];
    for (let i=rangeStart; i<=rangeEnd; i++){
        pages.push(i)
    }

    return (
        <Layout>
        <div>
        {finalPage === 1? null:
        (currPage > 1 && currPage < finalPage ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <button style={{ backgroundColor: '#b8c6cc',
                borderRadius: '7px',
                border: 'none',
                color: '#fff',
                padding: '5px',
                paddingRight: '10px',
                paddingLeft: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                marginLeft: '2px',
                marginRight: '2px',
                marginTop: '15px',
                marginBottom: '15px',
                fontSize: '18px'}}>
                <Link href={`/?page=${prevPage}`} style={{textDecoration: 'none', color:'#fff'}}>
                    &lt;
                </Link>
                </button>
                { currPage > 4 ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <button style={{ backgroundColor: '#b8c6cc',
                    borderRadius: '7px',
                    border: 'none',
                    color: '#fff',
                    padding: '5px',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    marginLeft: '2px',
                    marginRight: '2px',
                    marginTop: '15px',
                    marginBottom: '15px',
                    fontSize: '18px'}}>
                    <Link href={`/?page=1}`} style={{textDecoration: 'none', color:'#fff'}}>
                        1
                    </Link>
                    </button>
                    <div style={{fontWeight:'bold', color:'#b8c6cc', 
                        marginLeft: '3px',
                        marginRight: '3px',
                        marginTop: '15px',
                        marginBottom: '22px'}}>...</div>
                    </div>
                    ): null}
                    
                {
                    pages.map((page, index) => {
                    return <button key={index} style={{ backgroundColor: page===currPage? '#7c8d94':'#b8c6cc',
                    borderRadius: '7px',
                    border: 'none',
                    color: '#fff',
                    padding: '5px',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    marginLeft: '2px',
                    marginRight: '2px',
                    marginTop: '15px',
                    marginBottom: '15px',
                    fontSize: '18px'}}>
                    <Link href={`/?page=${page}`} style={{textDecoration: 'none', color:'#fff'}}>
                        {page}
                    </Link>
                    </button>
                })}

                { currPage < finalPage - 3 ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <div style={{fontWeight:'bold', color:'#b8c6cc', 
                    marginLeft: '3px',
                    marginRight: '3px',
                    marginTop: '15px',
                    marginBottom: '22px'}}>...</div>
                    <button style={{ backgroundColor: '#b8c6cc',
                    borderRadius: '7px',
                    border: 'none',
                    color: '#fff',
                    padding: '5px',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    marginLeft: '2px',
                    marginRight: '2px',
                    marginTop: '15px',
                    marginBottom: '15px',
                    fontSize: '18px'}}>
                    <Link href={`/?page=${finalPage}}`} style={{textDecoration: 'none', color:'#fff'}}>
                        {finalPage}
                    </Link>
                    </button>
                    </div>
                    ): null}
            
                <button style={{ backgroundColor: '#b8c6cc',
                borderRadius: '7px',
                border: 'none',
                color: '#fff',
                padding: '5px',
                paddingRight: '10px',
                paddingLeft: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                marginLeft: '2px',
                marginRight: '2px',
                marginTop: '15px',
                marginBottom: '15px',
                fontSize: '18px'}}>
                <Link href={`/?page=${nextPage}`} style={{textDecoration: 'none', color:'#fff'}}>
                    &gt;
                </Link>
                </button>
                </div>
            </div>
           ) : 
           currPage === finalPage ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                <button style={{ backgroundColor: '#b8c6cc',
                borderRadius: '7px',
                border: 'none',
                color: '#fff',
                padding: '5px',
                paddingRight: '10px',
                paddingLeft: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                marginLeft: '2px',
                marginRight: '2px',
                marginTop: '15px',
                marginBottom: '15px',
                fontSize: '18px'}}>
                <Link href={`/?page=${prevPage}`} style={{textDecoration: 'none', color:'#fff'}}>
                    &lt; 
                </Link>
                </button>
                { currPage > 4 ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <button style={{ backgroundColor: '#b8c6cc',
                    borderRadius: '7px',
                    border: 'none',
                    color: '#fff',
                    padding: '5px',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    marginLeft: '2px',
                    marginRight: '2px',
                    marginTop: '15px',
                    marginBottom: '15px',
                    fontSize: '18px'}}>
                    <Link href={`/?page=1}`} style={{textDecoration: 'none', color:'#fff'}}>
                        1
                    </Link>
                    </button>
                    <div style={{fontWeight:'bold', color:'#b8c6cc', 
                        marginLeft: '3px',
                        marginRight: '3px',
                        marginTop: '15px',
                        marginBottom: '22px'}}>...</div>
                    </div>
                    ): null}
            
                {
                pages.map((page, index) => {
                    return <button key={index} style={{ backgroundColor: page===currPage? '#7c8d94':'#b8c6cc',
                    borderRadius: '7px',
                    border: 'none',
                    color: '#fff',
                    padding: '5px',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    marginLeft: '2px',
                    marginRight: '2px',
                    marginTop: '15px',
                    marginBottom: '15px',
                    fontSize: '18px'}}>
                    <Link href={`/?page=${page}`} style={{textDecoration: 'none', color:'#fff'}}>
                        {page}
                    </Link>
                    </button>
                })}
                </div>
            </div>
            
           ) : 
           currPage === 1 ? (
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                <div style={{ display: 'inline-flex', alignItems: 'center' }}>

                {
                pages.map((page, index) => {
                    return <button key={index} style={{ backgroundColor: page===currPage? '#7c8d94':'#b8c6cc',
                    borderRadius: '7px',
                    border: 'none',
                    color: '#fff',
                    padding: '5px',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    marginLeft: '2px',
                    marginRight: '2px',
                    marginTop: '15px',
                    marginBottom: '15px',
                    fontSize: '18px'}}>
                    <Link href={`/?page=${page}`} style={{textDecoration: 'none', color:'#fff'}}>
                        {page}
                    </Link>
                    </button>
                })}

                { currPage < finalPage - 3 ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center' }}>
                    <div style={{fontWeight:'bold', color:'#b8c6cc', 
                    marginLeft: '3px',
                    marginRight: '3px',
                    marginTop: '15px',
                    marginBottom: '22px'}}>...</div>
                    <button style={{ backgroundColor: '#b8c6cc',
                    borderRadius: '7px',
                    border: 'none',
                    color: '#fff',
                    padding: '5px',
                    paddingRight: '10px',
                    paddingLeft: '10px',
                    boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                    marginLeft: '2px',
                    marginRight: '2px',
                    marginTop: '15px',
                    marginBottom: '15px',
                    fontSize: '18px'}}>
                    <Link href={`/?page=${finalPage}}`} style={{textDecoration: 'none', color:'#fff'}}>
                        {finalPage}
                    </Link>
                    </button>
                    </div>
                    ): null}
                
                <button style={{ backgroundColor: '#b8c6cc',
                borderRadius: '7px',
                border: 'none',
                color: '#fff',
                padding: '5px',
                paddingRight: '10px',
                paddingLeft: '10px',
                boxShadow: '0px 2px 5px rgba(0, 0, 0, 0.2)',
                marginLeft: '2px',
                marginRight: '2px',
                marginTop: '15px',
                marginBottom: '15px',
                fontSize: '18px'}}>
                <Link href={`/?page=${nextPage}`} style={{textDecoration: 'none', color:'#fff'}}>
                    &gt; 
                </Link>
                </button>
                </div>
            </div>
          
           ) : null)}
          </div>
    </Layout>
    )
}
export default Pagination;