import React from 'react'
import Main from './Main'
import Student from './Student'
import {Switch, Route} from 'react-router-dom'
import University from './University'
export default function RoutesUtil(props) {
    return (
        <>
            <Main/>
            <Switch>
                <Route exact path="/student" component={Student} />
                <Route exact path="/university" component={University} />
            </Switch>
            {/* <StudentTable/>
            <UniversityTable></UniversityTable> */}
        </>
    );
}


