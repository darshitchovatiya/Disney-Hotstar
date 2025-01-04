import React, { useEffect } from 'react'
import styled from 'styled-components'
import { provider } from '../firebase';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithPopup } from "firebase/auth";
import { selectUserName, selectUserPhoto, setUserLoginDetails, setSignOutState } from '../features/user/userSlice';


const Hender = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate(); // eslint-disable-next-line
    const userName = useSelector(selectUserName);
    const userPhoto = useSelector(selectUserPhoto);

    useEffect(() => {
        const auth = getAuth();
        auth.onAuthStateChanged(async (user) => {
            if (user) {
                setUser(user);
                navigate('/home');
            }
        });

    }, [userName]);

    const handleAuth = (req, res) => {
        if (!userName) {
            const auth = getAuth();
            signInWithPopup(auth, provider)
                .then((result) => {
                    setUser(result.user);
                })
                .catch((err) => {
                    console.error("Error during authentication:", err);
                    alert(`Authentication Error: ${err.message}`);
                });
        } else if (userName) {
            const auth = getAuth();
            auth.signOut().then((result) => {
                dispatch(setSignOutState());
                navigate('/');
            }).catch((err) => alert(`Authentication Error: ${err.message}`));
        }
    };


    const setUser = (user) => {
        dispatch(setUserLoginDetails({
            name: user.displayName,
            email: user.email,
            photo: user.photoURL,
        })
        );
    }

    return (
        <Nav>
            <Logo>
                <img src="/images/logo.svg" alt='Disney+' />
            </Logo>

            {
                !userName ? (
                    <Login onClick={handleAuth}>
                        login
                    </Login>
                ) : (
                    <>
                        <NavMenu>
                            <a href='/home'>
                                <img src="/images/home-icon.svg" alt='HOME' />
                                <span>HOME</span>
                            </a>
                            <a href='/'>
                                <img src="/images/search-icon.svg" alt='SEARCH' />
                                <span>SEARCH</span>
                            </a>
                            <a href='/'>
                                <img src="/images/watchlist-icon.svg" alt='WATCHLIST' />
                                <span>WATCHLIST</span>
                            </a>
                            <a href='/'>
                                <img src="/images/original-icon.svg" alt='ORIGINAL' />
                                <span>ORIGINAL</span>
                            </a>
                            <a href='/'>
                                <img src="/images/movie-icon.svg" alt='MOVIE' />
                                <span>MOVIE</span>
                            </a>
                            <a href='/'>
                                <img src="/images/series-icon.svg" alt='SERIES' />
                                <span>SERIES</span>
                            </a>
                        </NavMenu>
                        <SignOut>
                            <UserImg src={userPhoto} alt={userName} />
                            <DropDown>
                                <span onClick={handleAuth}> Sign out </span>
                            </DropDown>
                        </SignOut>
                    </>
                )}
        </Nav>
    )
}

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center; 
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`
const Logo = styled.a`
    padding: 0;
    width: 80px;
    margin-top: 4px;
    max-height: 70px;
    font-size: 0;
    display: inline-block;

 img  {
    display: block;
    width: 100%;
 }
`

const NavMenu = styled.div`
  display: flex;
  align-items: center;
  flex-flow:row nowrap;
  height: 100%;
  justify-content: flex-end;
  margin : 0px;
  padding: 0px;
  position: relative;
  margin-right: auto;
  margin-left: 25px;

  a {
        display: flex;
        align-items: center;
        padding: 0px 12px;

        img {
            height: 20px;
            min-width: 20px;
            width: 20px;
            z-index: auto;
        }

        span {
            color: rgb(249, 249, 249);
            font-size: 13px;
            letter-spacing: 1.42px;
            line-height: 1.08;
            padding: 2px 0px;
            white-space: nowrap;
            position: relative;

            &:before {
                background-color: rgb(249, 249, 249);
                border-radius: 0px 0px 4px 4px;
                bottom: -6px;
                content: "";
                height: 2px;
                left: 0px;
                opacity: 0;
                position: absolute;
                right: 0px;
                transform-origin: left center;
                transform: scaleX(0);
                transition: all 250ms cubic-bezier(0.25, 0.46, 0.45, 0.94) 0s;
                visibility: hidden;
                width: auto;
            }
        }

        &:hover {
            span:before {
                transform: scalex(1);
                visibility: visible;
                opacity: 1 !important;
            }
        }  
    }

  



//   @media (max-width: 768px) {
//     display: flex; 
//   }

  @media (max-width: 1024px) {
    margin-left: 10px;
    a {
      padding: 0px 8px;

      span {
        font-size: 11px;
        letter-spacing: 1.2px;
      }
    }
  }

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    margin: 0px;
    a {
      padding: 4px 8px;

      img {
        height: 18px;
        min-width: 18px;
      }

      span {
        font-size: 10px;
      }
    }
  }

  @media (max-width: 480px) {
    flex-direction: column;
    align-items: center;

    a {
      padding: 6px 0;
      span {
        font-size: 9px;
      }
    }
  }
  
`

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all .2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`
const UserImg = styled.img`
    height: 100% !important;
    letter-spacing: 3px;
`
const DropDown = styled.div`
    position: absolute;
    top: 45px;
    right: 0px;
    background: rgb(19, 19, 19);
    border: 1px solid rgba(151, 151, 151, 0.34);
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
    padding: 10px;
    font-size: 14px;
    letter-spacing: 3px;
    width: 100px;
    opacity: 0;
`

const SignOut = styled.div`
    position: relative;
    height: 48px;
    width: 48px;
    display: flex;
    cursor: pointer;
    align-items: center;
    justify-content: center;

    ${UserImg} {
        border-radius: 50%;
        width: 100%;
    }

    &:hover {
         ${DropDown} {
            opacity: 1;
            transition: 1s;
        }
    }
`

export default Hender
