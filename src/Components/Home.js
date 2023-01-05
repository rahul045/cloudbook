import React from 'react';

import Notes from './Notes';


const Home = () => {

    return (
        <>
            <div className='container my-3'>
                <h2>Add a Note</h2>
                <form>
                    <div className="form-floating">
                        <textarea className="form-control " placeholder="Leave a comment here" id="floatingTextarea"></textarea>
                        <label for="floatingTextarea">Comments</label>
                    </div>

                    <button type="submit" className="btn btn-primary">Submit</button>
                </form>

            </div>
            <Notes />
        </>
    )
}

export default Home
