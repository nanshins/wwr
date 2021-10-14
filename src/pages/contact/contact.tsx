import {
  ChangeEventHandler,
  FormEventHandler,
  Fragment,
  useState,
  VFC
} from "react";
import styled from "styled-components";
import { Section } from "~/components/section";
import { SEO } from "~/components/seo";
import { useSWRConfigContext } from "~/hooks/swr-config";
import { colors } from "~/styles/colors";

const ModifiedSection = styled(Section)`
  min-height: calc(100vh - 101px);
  display: flex;
  align-items: center;

  @media (max-width: 767px) {
    flex-direction: column;
  }
`;

const FormWrapper = styled.div`
  background-color: ${colors.white};
  padding: 60px;
  width: 500px;

  @media (max-width: 767px) {
    max-width: 100%;
  }
`;

const FieldWrapper = styled.div`
  position: relative;
  min-height: 65px;
  width: 100%;

  &:not(:first-child) {
    margin-top: 20px;
  }
`;

const FieldLabel = styled.label`
  position: relative;
  display: block;
  font-size: 16px;
  height: 15px;
  top: 33px;
  width: 130%;
  color: ${colors.lightGray};
  font-weight: 300;
  transform-origin: 0px 0px 0px;
  transform: matrix(1, 0, 0, 1, 0, 0);
  transition: transform 200ms ease;
  cursor: text;
`;

const Input = styled.input`
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 16px;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 400;
  height: 40px;
  border: none;
  outline: none;
  box-shadow: unset;
  margin: 3px 0;

  &::placeholder {
    color: transparent;
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    transform: matrix(0.72, 0, 0, 0.72, 0, -25);
  }
`;

const Texxtarea = styled.textarea`
  width: 100%;
  font-size: 16px;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 400;
  border: none;
  outline: none;
  box-shadow: unset;
  margin: 3px 0;
  resize: vertical;
  padding-top: 25px;

  & ~ label {
    position: absolute;
  }

  &::placeholder {
    color: transparent;
  }

  &:focus ~ label,
  &:not(:placeholder-shown) ~ label {
    transform: matrix(0.72, 0, 0, 0.72, 0, -25);
  }
`;

const SubmitButton = styled.button`
  width: 100%;
  height: 40px;
  background-color: transparent;
  vertical-align: middle;
  border-radius: 2px;
  font-size: 12px;
  font-family: "Helvetica Neue", sans-serif;
  font-weight: 400;
  border: 1px solid ${colors.almostBlack};
  color: ${colors.almostBlack};
  box-sizing: border-box;
  cursor: pointer;
  transition: border-color 0.3s ease, color 0.3s ease, background 0.3s ease;
  outline: none;
`;

const DetailsWrapper = styled.div`
  flex-grow: 1;
  margin-right: 40px;

  @media (max-width: 767px) {
    flex-grow: 0;
    margin-right: 0;
    margin-bottom: 40px;
  }
`;

const Contact: VFC = () => {
  const [email, setEmail] = useState<string>("");
  const [body, setBody] = useState<string>("");

  const { client } = useSWRConfigContext();

  const changeHandler: ChangeEventHandler<
    HTMLInputElement | HTMLTextAreaElement
  > = (e) => {
    if (e.target.name === "email") {
      setEmail(e.target.value);
    } else if (e.target.name === "body") {
      setBody(e.target.value);
    }
  };

  const submitHandler: FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const response = await client
      .post("/contact", {
        email,
        body
      })
      .catch((err) => {
        console.log(err.message);
        console.log(err.response);
        return null;
      });
    console.log(response);
  };
  return (
    <Fragment>
      <SEO title="Contact us" />
      <ModifiedSection backgroundColor={colors.almostWhite}>
        <DetailsWrapper>
          <h1>Contact Us</h1>
        </DetailsWrapper>
        <FormWrapper>
          <form onSubmit={submitHandler}>
            <FieldWrapper>
              <Input
                id="contact[email]"
                type="email"
                name="email"
                value={email}
                onChange={changeHandler}
                placeholder="Email"
              />
              <FieldLabel htmlFor="contact[email]">Email</FieldLabel>
            </FieldWrapper>
            <FieldWrapper>
              <Texxtarea
                id="contact[body]"
                name="body"
                rows={4}
                value={body}
                onChange={changeHandler}
                placeholder="Body"
              />
              <FieldLabel htmlFor="contact[body]">
                The inquiry is as follows：
              </FieldLabel>
            </FieldWrapper>
            <FieldWrapper>
              <SubmitButton type="submit">Send</SubmitButton>
            </FieldWrapper>
          </form>
        </FormWrapper>
      </ModifiedSection>
    </Fragment>
  );
};

export { Contact };
