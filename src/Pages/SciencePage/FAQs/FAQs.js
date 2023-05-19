import React, { useState } from 'react';
import img from '../../../assets/wepik-export-20230516131526jrNm.png';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import styled from '@emotion/styled';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';






const FAQs = () => {

    const Accordion = styled((props) => (
        <MuiAccordion disableGutters elevation={0} square {...props} />
    ))(({ theme }) => ({
        border: `1px solid #fff`,
        borderRadius: '8px'

    }));

    const AccordionSummary = styled((props) => (
        <MuiAccordionSummary
            expandIcon={<ExpandMoreIcon sx={{ fontSize: '0.9rem', color: 'white' }} />}
            {...props}
        />
    ))(({ theme }) => ({
        backgroundColor: '#424242',
        color: 'white',
        borderRadius: '8px',
        flexDirection: 'row',
        '& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
            transform: 'rotate(90deg)',
        },
        '& .MuiAccordionSummary-content': {
            marginLeft: "1px",
        }
    }));

    const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
        backgroundColor: '#424242',
        color: 'white',
        borderRadius: '8px',
        fontSize:'10px'
    }));

    const [expanded, setExpanded] = useState('');

    const handleChange = (panel) => (event, newExpanded) => {
        setExpanded(newExpanded ? panel : false);
    };

    return (
        <div style={{ background: `url(${img})`, objectFit: 'cover' }} className='pt-40 flex items-center justify-center pb-40 font'>
            <div className='px-10 lg:px-32'>
                <h1 className='text-3xl font-bold mb-6'>Frequently Asked Questions</h1>
                <div className='grid grid-cols-1 lg:grid-cols-2 gap-y-3 gap-x-10 items-start'>
                    <Accordion expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}

                        >
                            <Typography>What is a typical day of a Masters' Union student?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel2'} onChange={handleChange('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}

                        >
                            <Typography>Can I tailor my Masters' Union PGP TBM?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel3'} onChange={handleChange('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}

                        >
                            <Typography>How will I be graded at Masters' Union?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel4'} onChange={handleChange('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}

                        >
                            <Typography>What are the benefits of the one-year format?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel5'} onChange={handleChange('panel5')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}

                        >
                            <Typography>Is the Masters’ Union PGP TBM a right fit for non-tech background?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion expanded={expanded === 'panel6'} onChange={handleChange('panel6')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: 'white' }} />}
                        >
                            <Typography>Does Masters' Union have a cut-off for GMAT, GRE or CAT?</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse
                                malesuada lacus ex, sit amet blandit leo lobortis eget.
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                </div>

            </div>
        </div>
    );
};

export default FAQs;