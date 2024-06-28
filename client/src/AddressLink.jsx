import React from 'react'

const AddressLink = ({children,className=null}) => {
    if(!className){
        className='my-3';
    }
    className+=' flex gap-1 font-semibold underline'
    return (
        <a className={className} target="_blank" href={`https://maps.google.com/?q=${children}`}>
            <img src="/mappointer.svg" alt="" />
            {children}
        </a>
    )
}

export default AddressLink
