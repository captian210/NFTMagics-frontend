
import * as React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import {
    Skeleton
} from '@mui/material';
import { LoadingComponent } from '@/components/Loading';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import toast from "@/components/Toast";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Web3 from "web3";
import { useWeb3React } from "@web3-react/core";
import { actionAddFavorites } from '@/store/actions';

const IMG_HEIGHT = 280;

const EmptyCard = styled('div')(({ theme, width, height }: { theme?: any, width: any, height: any }) => {
    return ({
        display: 'flex',
        width: width,
        height: height,
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        margin: '10px 10px',
        flexDirection: 'column',
        zIndex: 2,
        maxWidth: '550px',
    })
});

const CardDiv = styled('div')(({ theme, width, height }: { theme?: any, width: any, height: any }) => {

    const sm = useMediaQuery('(max-width:600px)');
    const md = useMediaQuery('(max-width:900px)');
    const lg = useMediaQuery('(max-width:1200px)');

    return ({
        '& .card-image-card': {
            display: 'flex',
            width: width,
            // height: height,
            textAlign: "center",
            margin: 10,
            marginTop: 20,
            flexDirection: 'column',
            borderRadius: 10,
            zIndex: 2,
            maxWidth: '550px',
            transition: 'all 0.3s',
            // border: '1px solid rgba(0, 0, 0, 0.15)',
            boxShadow: 'rgb(0 0 0 / 20%) 0px 0px 10px 0px',
            ...(md && {
                maxWidth: '355px',
            }),
            '& .card-image-card-link': {
                borderRadius: 10,
                color: 'rgb(32, 129, 226)',
                textDecoration: 'none',
                '& .card-image-card-link-meida': {
                    height: IMG_HEIGHT,
                    zIndex: 2,
                    borderBottom: '1px solid background.default',
                    minHeight: 'inherit',
                    borderRadius: 'inherit',
                    position: 'relative',
                    ...((sm || md) && {
                        height: 300,
                    }),
                    '& .media-img': {
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column',
                        display: 'flex',
                        height: '100%',
                        minHeight: 'inherit',
                        width: '100%',
                        position: 'relative',
                        borderRadius: 'inherit',
                        overflow: 'hidden',
                        borderBottomLeftRadius: 0,
                        borderBottomRightRadius: 0,
                        '& .giftAddress': {
                            position: 'absolute',
                            zIndex: 1,
                            transform: 'rotate(45deg)',
                            height: 50,
                            width: 120,
                            bottom: '-10px',
                            left: '-45px',
                            paddingTop: 5,
                            backgroundColor: '#cf3464',
                            color: 'white',
                            boxShadow: `${theme.palette.divider} 0px 0px 10px 0px`,
                        },
                        '& .asset-media-image': {
                            height: IMG_HEIGHT,
                            width: width,
                            borderRadius: 'inherit',
                            borderBottomLeftRadius: 0,
                            borderBottomRightRadius: 0,
                            maxHeight: '100%',
                            maxWidth: '100%',
                            overflow: 'hidden',
                            position: 'relative',
                            '& img': {
                                objectFit: 'fill',
                                width: '100%',
                                height: '100%',
                                maxWidth: '100%',
                                maxHeight: '100%',
                                borderTopLeftRadius: 'inherit',
                                borderTopRightRadius: 'inherit',
                                borderBottomRightRadius: 0,
                                borderBottomLeftRadius: 0,
                            }
                        }
                    },
                    '& .hastag': {
                        position: 'absolute',
                        right: 10,
                        top: '-10px',
                        padding: '5px 10px',
                        backgroundColor: '#1976d2',
                        color: 'white',
                        borderRadius: 5,
                        boxShadow: `${theme.palette.divider} 0px 0px 10px 0px`,
                    }
                }
            },
            '& .card-image-text-area': {
                display: 'flex',
                flexDirection: 'column',
                '& .header': {
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                    width: '100%',
                    fontWeight: 600,
                    padding: 20,
                    // border: '1px solid rgb(229, 232, 235)',
                    color: `${theme.palette.text.primary}`,
                    backgroundColor: `${theme.palette.background.default}`,
                    textAlign: 'left',
                    '& .avatar': {
                        position: 'relative',
                        width: 40,
                        height: 40,
                        marginRight: 5,
                        border: `1px solid white`,
                        borderRadius: '50%',
                        boxShadow: `${theme.palette.text.primary} 0px 0px 3px 0px`,
                        '& span': {
                            borderRadius: '100%',
                        }
                    },
                    '& .content': {
                        flex: '1 1 auto',
                        flexFlow: 'column',
                        justifyContent: 'center',
                        marginRight: 5,
                        fontSize: 16,
                        alignItems: 'flex-start',
                        width: 150,
                        '& .description': {
                            fontWeight: 400,
                            fontSize: 13,
                            display: '-webkit-box',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'break-spaces',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                        }
                    },
                    '& .price': {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'flex-end',
                        fontSize: 13,
                        '& .amount': {
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'flex-end',
                            fontSize: 15,
                            fontWeight: 500,
                            '& img': {
                                marginRight: 5,
                                width: 20,
                                height: 20
                            }
                        }
                    }
                },
                '& .footer': {
                    display: 'flex',
                    justifyContent: 'space-between',
                    backgroundColor: `${theme.palette.background.default}`,
                    padding: 10,
                    paddingTop: 0,
                    borderRadius: '0px 0px 15px 15px',
                    '& .action': {
                        color: `${theme.palette.text.primary}`,
                        fontSize: 12,
                        '& .token-info': {
                            display: 'flex',
                            alignItems: 'center',
                            transition: 'all 0.3s',
                            marginLeft: 5,
                            '& img': {
                                width: 20,
                                height: 20
                            },
                        },
                        '& .link': {
                            marginLeft: 5,
                            cursor: 'pointer',
                            fontWeight: 500,
                            display: 'none',
                            transition: 'all 0.3s',
                        },
                    },
                    '& .like': {
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: `${theme.palette.text.primary}`,
                        fontSize: 10,
                        '&:hover': {
                            color: 'rgb(235, 87, 87)',
                        },
                        '& .like-img': {
                            fontSize: 20
                        }
                    }
                }
            },
            '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: 'rgb(4 17 29 / 25%) 0px 0px 10px 0px',
                '& .footer .action': {
                    '& .token-info': {
                        display: 'none'
                    },
                    '& .link': {
                        display: 'block !important'
                    },
                }
            }
        }
    })
})

const NFTCard = ({ item, empty, width, height, timeAgo }: { item: any, empty: any, width: any, height: any, timeAgo:any }) => {
    
    const { account, library }: any = useWeb3React();
    const router = useRouter();
    const dispatch = useDispatch();
    const [favorite, setFavorite] = React.useState(0);

    let web3 = new Web3();
    if (library) web3 = new Web3(library.provider);

    const notify = React.useCallback((type, message) => {
        toast({ type, message });
    }, []);

    const fromWei = React.useCallback((web3, val) => {
        if (val) {
            val = val.toString();
            return web3.utils.fromWei(val);
        } else {
            return "0"
        }
    }, []);

    if (empty) {
        return (
            <EmptyCard width={width} height={height}>
                {/* <LoadingComponent /> */}
            </EmptyCard>
        );
    }

    const image = item?.image;
    const price = fromWei(web3, item.price)
    let token_img = '/svg/bnb.svg';
    let token_name = 'BNB';
    let pastTime;

    if (item.createDate) pastTime = timeAgo.format(new Date(item.createDate));
    else pastTime = timeAgo.format(new Date(item.createdAt));

    let re = /ute|ond/gi;
    pastTime = pastTime.toString().replace(re, "");

    if (item?.saleToken == 1) {
        token_img = '/images/token/ayra.png';
        token_name = 'AYRA';
    }
    if (item?.saleToken == 2) {
        token_img = '/images/token/ithd.png';
        token_name = 'ITHD';
    }

    const imgLoader = ({ src, width, quality }: { src: any, width?: any, quality?: any }) => {
        return `https://ipfs.infura.io/ipfs/${src}?w=${width || 300}&q=${quality || 75}`
    }
    const handleLink = (path: any) => (event: any) => {
        router.push(`/marketplace/assets/${item.itemId}/get`);
    };
    const handleAddFavorites = () => {
        if(!account) return notify('error', 'please connect wallet');

        if(item.likes.account.includes(account)) return notify('info', 'you have already add favorite');

        dispatch(actionAddFavorites({itemId: item.itemId, account}));
        
        setFavorite(favorite + 1);
        item.likes.account.push(account);
        notify('success', 'you have added favorite');
    }
    React.useEffect(() => {
        setFavorite(item.likes.account.length);
    },[]);

    return (
        <>
            {
                item ? (
                    <CardDiv height={height} width={width}>
                        <article className='card-image-card'>
                            <a className='card-image-card-link'>
                                <div className='card-image-card-link-meida' onClick={handleLink("/marketplace/assets/")}>
                                    <div className='media-img'>
                                        {
                                            item.giftAddress !== "0x0000000000000000000000000000000000000000" && (
                                                <div className='giftAddress'>
                                                    GIFT
                                                </div>
                                            )
                                        }
                                        {image && (
                                            <div className='asset-media-image'>
                                                <Skeleton className='' sx={{ height: '100%', width: '100%', borderRadius: 'inherit', borderBottomLeftRadius: 0, borderBottomRightRadius: 0 }} animation="wave" variant="rectangular" />
                                                <Image loader={imgLoader} src={image} layout="fill" objectFit="fill" />
                                            </div>
                                        )}
                                    </div>
                                    {
                                        item.hastag !== '' && (
                                            <div className='hastag'>
                                                {item.hastag}
                                            </div>
                                        )
                                    }
                                    {
                                        item.giftAddress !== "0x0000000000000000000000000000000000000000" && (
                                            <div className='giftAddress'>
                                                AS GIFT
                                            </div>
                                        )
                                    }
                                </div>
                                <footer className='card-image-text-area'>
                                    <div className='header'>
                                        {/* <div className='avatar'>
                                            <Image src={avatar} layout="fill" objectFit="fill" />
                                        </div> */}
                                        <div className='content'>
                                            <div className='title'>{item.name || <Skeleton variant="text" />}</div>
                                            <div className='description'>{item.description || <Skeleton variant="text" />}</div>
                                        </div>
                                        <div className='price'>
                                            {price ? (
                                                <>
                                                    <div>Price</div>
                                                    <div className='amount'>
                                                        {price > 0 && (
                                                            <img className='img' src={token_img} />
                                                        )}
                                                        {price > 0 ? price : '---'}
                                                    </div>
                                                    <div>{pastTime}</div>
                                                </>
                                            ) : (
                                                <>
                                                    <Skeleton variant="text" style={{ width: 50 }} />
                                                    <Skeleton variant="text" style={{ width: 100 }} />
                                                    <Skeleton variant="text" style={{ width: 70 }} />
                                                </>
                                            )}
                                        </div>
                                    </div>
                                    <div className='footer'>
                                        <div className='action'>
                                            <div className='token-info'>
                                                <span>{token_name}</span>
                                            </div>
                                            <div className='link' onClick={handleLink("/marketplace/assets/")}>
                                                {
                                                    item.seller === account ? ('View') : ('Buy now')
                                                }
                                            </div>
                                        </div>
                                        <div className='like' onClick={handleAddFavorites}>
                                            <FavoriteBorderIcon className='like-img' />
                                            <span>{favorite}</span>
                                        </div>
                                    </div>
                                </footer>
                            </a>
                        </article>
                    </CardDiv>
                ) : (
                    <EmptyCard height={height} width={width} >
                        <LoadingComponent />
                    </EmptyCard>
                )
            }
        </>
    )
}

export default NFTCard;