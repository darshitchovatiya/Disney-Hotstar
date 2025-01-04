import React from 'react';
import styled from 'styled-components';
import ImgSlider from './ImgSlider';
import Viewers from './Viewers';
import Recommends from './Recommends';
import NewDisney from './NewDisney';
import Originals from './Originals';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import db from '../firebase';
import { setMovie } from '../features/movies/movieSlice';
import { selectUserName } from '../features/user/userSlice';
import { collection, onSnapshot } from 'firebase/firestore';
import Trendings from './Trending';

const Home = () => {
  const dispatch = useDispatch();
  const userName = useSelector(selectUserName);

  useEffect(() => {
    const moviesCollection = collection(db, 'movies');

    const unsubscribe = onSnapshot(moviesCollection, (snapshot) => {

      // // Initialize fresh arrays
      let recommends = [];
      let newDisneys = [];
      let originals = [];
      let trendings = [];

      // Use .forEach instead of .map for side effects
      snapshot.docs.forEach((doc) => {
        
        const data = doc.data();
       
        switch (data.type) {
          case 'recommend':
            recommends = [...recommends, { id: doc.id, ...data } ]
            break;
          case 'new':
            newDisneys = [...newDisneys,{ id: doc.id, ...data }]
            break;
          case 'original':
            originals = [...originals,{ id: doc.id,...data }]
            break;
          case 'trending':
            trendings = [...trendings,{ id: doc.id,...data }]
            break;
        }
      });
      dispatch(
        setMovie ({
            recommend: recommends,
            newDisney: newDisneys,
            original: originals,
            trending: trendings,
          })
        );
    });
    return unsubscribe;
  }, [dispatch, userName]);

  return (
    <Container>
      <ImgSlider />
      <Viewers />
      <Recommends />
      <NewDisney />
      <Originals />
      <Trendings />
    </Container>
  )

}

const Container = styled.main`
  position: relative;
  min-height: calc(100vh - 250px);
  overflow-x: hidden;
  display: block;
  top: 72px;
  padding: 0 calc(3.5vw + 5px);

  &:after {
    background-image: url('/images/home-background.png') center center / cover no-repeat fixed;
    content: "";
    position: absolute;
    inset: 0px;
    opacity: 1;
    z-index: -1;

  }

`;

export default Home;