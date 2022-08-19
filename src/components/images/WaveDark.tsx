import React from 'react';
import {DefaultImagePropsType, getImageURI, JahiaCtx} from '@jahia/nextjs-sdk';
import {makeStyles} from '~/makesStyles';

const useStyles = makeStyles()(theme => ({
    svgWrapper: {
        [theme.breakpoints.up('md')]: {
            position: 'relative',
            width: '100%',
            // PaddingBottom: '51%',
            verticalAlign: 'middle'
        }
    },
    svgDesktop: {
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block'
        }
    },
    svgMobile: {
        display: 'block',
        margin: '-3px 0 0',
        [theme.breakpoints.up('sm')]: {
            display: 'none'
        }
    }
}));

export function WaveDark({path, alt, className}:DefaultImagePropsType) {
    const {workspace} = React.useContext(JahiaCtx);
    const {classes} = useStyles();

    if (!workspace || !path) {
        return;
    }

    const uri = getImageURI({uri: path, workspace});
    return (
        <div className={classes.svgWrapper}>
            <svg viewBox="0 0 1440 785"
                 fill="none"
                 className={classes.svgDesktop}
                 xmlns="http://www.w3.org/2000/svg"
                 xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <mask id="mask0_dw" mask-type="alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="1440" height="785">
                    <path
                        d="M0 0L1440 0V759.894C1077 719.989 1055.85 832.681 535 759.894C218.5 715.665 190.5 744.612 0.000649284 758.196L0 0Z"
                        fill="white"/>
                </mask>
                <g mask="url(#mask0_dw)" className="image-desktop">

                    <rect width="100%" height="100%" fill="url(#pattern0_dw)"/>
                    <g style={{mixBlendMode: 'multiply'}}>
                        <rect y="790"
                              width="790"
                              height="1440"
                              transform="rotate(-90 0 790)"
                              fill="url(#paint0_linear_dw)"/>
                    </g>
                </g>
                <defs>

                    <pattern id="pattern0_dw" width="100%" height="100%">
                        <use href="#image0_dw"/>
                    </pattern>
                    <linearGradient id="paint0_linear_dw"
                                    x1="-1.47149e-06"
                                    y1="1510"
                                    x2="790"
                                    y2="1510"
                                    gradientUnits="userSpaceOnUse"
                    >
                        <stop/>
                        <stop offset="1" stopOpacity="0"/>
                    </linearGradient>

                    <image id="image0_dw"
                           preserveAspectRatio="xMidYMid slice"
                           width="100%"
                           height="100%"
                           href={uri}/>
                </defs>
            </svg>

            <svg viewBox="0 0 375 545"
                 fill="none"
                 className={classes.svgMobile}
                 xmlns="http://www.w3.org/2000/svg"
                 xmlnsXlink="http://www.w3.org/1999/xlink"
            >
                <mask id="mask0_dw_xs"
                      mask-type="alpha"
                      maskUnits="userSpaceOnUse"
                      x="0"
                      y="0"
                      width="375"
                      height="545"
                >
                    <path
                        d="M0 0L375 0V538.444C280.469 528.023 274.962 557.452 139.323 538.444C56.901 526.893 49.6094 534.453 0.000169084 538L0 0Z"
                        fill="white"/>
                </mask>
                <g mask="url(#mask0_dw_xs)">
                    <rect width="100%" height="100%" fill="url(#pattern0_dw_xs)"/>
                    <g style={{mixBlendMode: 'multiply'}}>
                        <rect y="550"
                              width="550"
                              height="375"
                              transform="rotate(-90 0 550)"
                              fill="url(#paint0_linear_dw_xs)"/>
                    </g>
                </g>
                <defs>

                    <pattern id="pattern0_dw_xs" width="100%" height="100%">
                        <use href="#image0_dw_xs"/>
                    </pattern>
                    <linearGradient id="paint0_linear_dw_xs"
                                    x1="-1.02445e-06"
                                    y1="737.5"
                                    x2="758.5"
                                    y2="737.5"
                                    gradientUnits="userSpaceOnUse"
                    >
                        <stop/>
                        <stop offset="1" stopOpacity="0"/>
                    </linearGradient>

                    <image id="image0_dw_xs"
                           preserveAspectRatio="xMidYMid slice"
                           width="100%"
                           height="100%"
                           href={uri}/>

                </defs>
            </svg>
        </div>
    );
}

WaveDark.defaultProps = {
    alt: 'this is a wave image'
};
