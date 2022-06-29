import * as React from "react";
import {
  Box,
  Text,
  VStack,
  Grid,
  Input,
  Flex,
  Button,
  FormControl,
  FormHelperText,
  Heading,
  useMediaQuery,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import logo from "./img/logo.png";
import Image from "components/Image";
import TokenCard from "components/TokenCard";
import useGetTokenMedata from "hooks/useGetNftMedata";

const AINB_CONTRACT_ADDRESS = "0x64b6b4142d4D78E49D53430C1d3939F2317f9085";
const MOONBIRD_ADDRESS = "0x23581767a106ae21c074b2276D25e5C3e136a68b";
const AI_CONTRACT_ADDRESS = "0xCd8426DA78377150B04b1D7a88aedc24cCaC6701";

const FieldName = "tokenId";

export const App = () => {
  const [isLargerThan720] = useMediaQuery("(min-width: 720px)");
  const {
    mutate: getNightBird,
    isLoading: isLoadingNightBirdData,
    data: nightBirdData,
  } = useGetTokenMedata();
  const {
    mutate: getMoonBird,
    isLoading: isLoadingMoonBirdData,
    data: moonBirdData,
  } = useGetTokenMedata();
  const {
    mutate: getAiBanner,
    isLoading: isLoadingAiBannerData,
    data: aiBannerData,
  } = useGetTokenMedata();

  const { handleSubmit, register } = useForm();

  const isLoading =
    isLoadingNightBirdData || isLoadingMoonBirdData || isLoadingAiBannerData;

  const handleOnSubmit = (value: any) => {
    getNightBird({
      contractAddress: AINB_CONTRACT_ADDRESS,
      tokenId: value[FieldName],
    });
    getMoonBird({
      contractAddress: MOONBIRD_ADDRESS,
      tokenId: value[FieldName],
    });
    getAiBanner({
      contractAddress: AI_CONTRACT_ADDRESS,
      tokenId: value[FieldName],
    });
  };

  return (
    <Box textAlign="center" fontSize="xl">
      <Grid minH="100vh" p={3}>
        <ColorModeSwitcher justifySelf="flex-end" />
        <VStack spacing={8}>
          <Image borderRadius="50%" w="24" h="24" src={logo} />

          <Heading>AINightbirds</Heading>
          <Text size="md">
            Search & Download Hi-Res, Pixelated Ai Nightbird, MoonBird & Ai
            Banner
          </Text>

          <Flex>
            <form onSubmit={handleSubmit(handleOnSubmit)}>
              <FormControl display="flex">
                <Box mr="2">
                  <Input
                    disabled={isLoading}
                    placeholder="Search by Token Id"
                    {...register(FieldName, {
                      required: "This is required",
                      minLength: {
                        value: 1,
                        message: "Minimum length should be 1",
                      },
                      maxLength: {
                        value: 5,
                        message: "Max length should be 1",
                      },
                    })}
                  />
                  <FormHelperText textAlign="left" color="red.500">
                    {/* {errors[FieldName] && errors[FieldName].message} */}
                  </FormHelperText>
                  <FormHelperText>
                    You don't even have to connect you're address Hoot Hoot!
                  </FormHelperText>
                </Box>

                <Button
                  isLoading={isLoading}
                  type="submit"
                  disabled={isLoading}
                >
                  Search
                </Button>
              </FormControl>
            </form>
          </Flex>

          <Flex
            gap="1rem"
            flexWrap={isLargerThan720 ? "nowrap" : "wrap"}
            justifyContent="center"
          >
            {nightBirdData?.media?.[0].gateway && (
              <TokenCard
                name={nightBirdData?.metadata?.name}
                title="Hi-Resolution NightBird"
                src={nightBirdData?.media?.[0].gateway}
                height={350}
                width={350}
              />
            )}
            {moonBirdData?.media?.[0].gateway && (
              <TokenCard
                name={moonBirdData?.metadata?.name}
                title="Moonbird"
                src={moonBirdData?.media?.[0].gateway}
                height={350}
                width={350}
              />
            )}
            {nightBirdData?.media?.[0].gateway && (
              <TokenCard
                name={nightBirdData?.metadata?.name}
                title="16-bit NightBird"
                src={nightBirdData?.media?.[0].gateway}
                height={350}
                width={350}
                pixelSize={8}
              />
            )}
          </Flex>
          <Flex
            gap="1rem"
            flexWrap={isLargerThan720 ? "nowrap" : "wrap"}
            justifyContent="center"
          >
            {aiBannerData?.media?.[0].gateway && (
              <TokenCard
                name={aiBannerData?.metadata?.name}
                title="Hi-Resolution Ai Banner"
                src={aiBannerData?.media?.[0].gateway}
                height={350}
                width={1080}
              />
            )}
          </Flex>
          {/* <Text fontSize="16px">
            This site is not affiliated with AINightbirds <br /> © Made with
            React, Vercel
          </Text> */}
          <Text fontSize="16px">
            If you love this service, would be greatful <br /> for a donation
            airdrop to <b>onlyayep.eth</b>
          </Text>
        </VStack>
      </Grid>
    </Box>
  );
};
