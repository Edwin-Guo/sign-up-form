import { zodResolver } from "@hookform/resolvers/zod";
import { router } from "expo-router";
import { Control, Controller, FieldPath, useForm } from "react-hook-form";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { z } from "zod";

const signupSchema = z
  .object({
    firstName: z
      .string()
      .min(2, "Must be at least 2 characters long.")
      .max(30, "Please shorten to under 30 characters."),
    lastName: z
      .string()
      .min(2, "Must be at least 2 characters long.")
      .max(30, "Please shorten to under 30 characters."),
    email: z.email("Please enter a valid email.").trim(),
    password: z.string().min(8, "Password must be at least 8 characters long."),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    error: "Passwords don't match.",
    path: ["confirmPassword"],
  });

type signupForm = z.infer<typeof signupSchema>;

type FieldProps = {
  control: Control<signupForm>;
  name: FieldPath<signupForm>;
  secure?: boolean;
  email?: boolean;
};

function Field({ control, name, secure, email }: FieldProps) {
  return (
    <Controller
      control={control}
      name={name}
      render={({
        field: { onChange, onBlur, value },
        fieldState: { error },
      }) => (
        <View>
          <TextInput
            style={styles.fieldBox}
            secureTextEntry={secure}
            keyboardType={email ? "email-address" : "default"}
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
          {error && <Text style={styles.error}>{error.message}</Text>}
        </View>
      )}
    />
  );
}

const SignupForm = () => {
  const { control, handleSubmit } = useForm<signupForm>({
    resolver: zodResolver(signupSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
    mode: "onSubmit",
  });

  const onSubmit = (data: signupForm) => {
    console.log(data.firstName + ", " + data.lastName + ": " + data.email);
    router.navigate({
      pathname: "/confirmation",
      params: { name: data.firstName },
    });
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <Text style={styles.title}>First Name</Text>
        <Field control={control} name="firstName" />

        <Text style={styles.title}>Last Name</Text>
        <Field control={control} name="lastName" />

        <Text style={styles.title}>Email</Text>
        <Field control={control} name="email" email />

        <Text style={styles.title}>Password</Text>
        <Field control={control} name="password" secure />

        <Text style={styles.title}>Confirm Password</Text>
        <Field control={control} name="confirmPassword" secure />

        <Pressable style={styles.button} onPress={handleSubmit(onSubmit)}>
          <Text style={[{ color: "#ffffff" }]}>Sign Up</Text>
        </Pressable>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
  },
  fieldBox: {
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: "#ffffff",
    width: 300,
    height: 40,
  },
  error: {
    color: "#ff0000",
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "#006fbf",
    borderRadius: 20,
    padding: 10,
    marginVertical: 10,
    alignItems: "center",
    width: 300,
    height: 40,
  },
});

export default SignupForm;
