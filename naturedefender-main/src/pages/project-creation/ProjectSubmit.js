import React, { useState } from "react";
import {
    CreationParent,
    CreationWrapper,
    SubfooterWrapper,
    Wrapper,
    FormHeader,
    BarWrapper
} from "./project.creation.styles";
import Subfooter from "../../components/subfooter/Subfooter";
import Navbar from "../../components/navbar/Navbar";
import arrow from "../../assets/arrow.png";
import FormTextInput from "../../components/custom-input/FormTextInput";
import Checkbox from "../../components/checkbox/Checkbox"
import { createProject } from "../../components/contracts/call";




const ProjectSubmit = () => {
    const [checked, setChecked] = useState(false);
    const onChange = () => {
        setChecked(!checked);
    };




    return (
        <CreationParent>
            <CreationWrapper>
                <BarWrapper>
                    <Navbar />
                </BarWrapper>
                <Wrapper>

                    <FormHeader>
                        <h3>PROJECT CREATION</h3>

                        <img src={arrow} alt="arrow" />
                        <p>Create a new project by filling out the form below</p>
                    </FormHeader>
                    <form>


                        <FormTextInput
                            labelName="Acceptable currency"
                            placeholder="NatureDefenders accepts only USDT for the time being"
                            name="acceptableCurrrency"

                        />
                        <FormTextInput
                            labelName="Wallet address"
                            placeholder="e.g 0xd914...ABED"
                            name="walletAddress"

                        />
                        <FormTextInput
                            labelName="Estimated amount"
                            placeholder="How much is needed to fund the project in USD"
                            name="estimatedAmount"

                        />

                        <FormTextInput
                            labelName="Funding goals"
                            placeholder="Specify the amount of fund needed to complete the project"
                            name="fundingGoals"

                        />

                        <Checkbox
                            id="checkbox"
                            label="Caveat: I agree that 1% of the donation will be allocated to the
                                    NatureDefenders platform from the donated funds"
                            value={checked}
                            onChange={onChange}
                        />

                        <button type='submit' className='w-full px-8 py-2 mb-2 font-semibold rounded-lg text-white bg-[#DA8450] hover:bg-[#1A1818]'
                            onClick={() => createProject()}>Create Project</button>




                    </form>


                    <SubfooterWrapper>
                        <Subfooter />
                    </SubfooterWrapper>
                </Wrapper>
            </CreationWrapper>
        </CreationParent>

    );
};

export default ProjectSubmit;