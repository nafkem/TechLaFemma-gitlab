import React, { useState } from "react";
import {
    DonateParent,
    DonateWrapper,
    Header,
    SubfooterWrapper,
    BarWrapper,
    SummaryContainer1,
    SummaryContainer2,
    TextContainer,
    EstimateContainer,
    InputContainer
} from "./donate.styles";
import Subfooter from "../../components/subfooter/Subfooter";
import Navbar from "../../components/navbar/Navbar";
import { Wrapper } from "../project-creation/project.creation.styles";
import rhinotwo from "../../assets/rhinotwo.png";
import Checkbox from "../../components/checkbox/Checkbox";
import FormTextInput from "../../components/custom-input/FormTextInput";
import {getDonor} from "../../components/contracts/call";














const Donate = () => {



    const [checked, setChecked] = useState(false);
    const onChange = () => {
        setChecked(!checked);
    };
    
   

    return (


        <DonateParent>
            <DonateWrapper>
                <BarWrapper>
                    <Navbar />
                </BarWrapper>
                <Wrapper>
                    <img src={rhinotwo} alt="rhinotwo" style={{ marginLeft: '4rem', marginTop: '4rem' }} />
                    <Header><h2>Donate</h2>

                    </Header>
                    <TextContainer>
                        <h3>HornShield</h3>
                        <h4>Project overview</h4>
                        <p>HornShield is a dedicated initiative aimed at safeguarding
                            <br></br>black rhinos from the threats of poaching and habitat loss.
                            <br></br>The project employs a two-fold approach, focusing on
                            <br></br>implementing robust security measures and supporting
                            <br></br>habitat restoration efforts. By combining these strategies,
                            <br></br>HornShield aims to ensure the long-term survival and well-
                            <br></br>being of black rhino populations.</p>
                        <EstimateContainer>
                            <h1> Estimated Amount<b style={{ marginLeft: '4rem' }}>Amount raised</b>
                                <br></br>5,000 ETH <b style={{ marginLeft: '8rem' }}> 3,825ETH</b> </h1>
                        </EstimateContainer>
                        <h5>Project Selected</h5>
                        <h6>HornShield</h6>
                        <InputContainer>
                            <FormTextInput
                                labelName="Input Amount"
                                name="amount"
                                placeholder="amount in USDT"
                                F />
                        </InputContainer>
                    </TextContainer>
                    <SummaryContainer1>
                        <h6>Total</h6>
                        <p>Your Contribution<b style={{ marginLeft: '4rem' }}>O.235 USDT</b></p>


                    </SummaryContainer1>
                    <SummaryContainer2>
                        <p>Your contribution must be valued at 2USD to be eligible
                            <br></br> for matching</p>
                        <Checkbox
                            id="checkbox"
                            label="Caveat: I agree that only 99% of the amount donated will be remited out of the total contribution, 
                            the remaining1% of the donation will be allocated to the NatureDefenders platform."
                            value={checked}
                            onChange={onChange}
                        />
                    </SummaryContainer2>
                    <button type='submit' className='w-full px-8 py-2 mb-2 font-semibold rounded-lg text-white bg-[#DA8450] hover:bg-[#1A1818]'
                            onClick={() => getDonor()}>Create Project</button>
                       
                   

                    <SubfooterWrapper>
                        <Subfooter />
                    </SubfooterWrapper>
                </Wrapper>
            </DonateWrapper>



        </DonateParent>




    )





}


export default Donate;