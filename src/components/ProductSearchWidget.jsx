import React from 'react'

export default function ProductSearchWidget() {
  return (
    <>
        <div className="sp-search-widget-container">
            <form>
                <div className="input-group">
                    <div className="search-box" style={{width: '65%'}}>
                        <input
                            type="text"
                            placeholder="Search products here ..."
                        />
                    </div>

                    <button type="submit" style={{width:"20%"}}>
                        Search
                    </button>
                </div>
            </form>
        </div>
    </>
  )
}
