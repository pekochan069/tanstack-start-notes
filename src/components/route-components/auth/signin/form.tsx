import { createForm } from "@tanstack/solid-form";
import { useNavigate } from "@tanstack/solid-router";
import { createServerFn } from "@tanstack/solid-start";
import { Show } from "solid-js";
import { toast } from "solid-sonner";
import { Button } from "~/components/ui/button";
import {
  TextField,
  TextFieldErrorMessage,
  TextFieldInput,
  TextFieldLabel,
} from "~/components/ui/text-field";
import { SvgSpinners3DotsMove } from "~/icons/svg-spinners/3-dots-move";
import { auth } from "~/lib/auth";

const submit = createServerFn({ method: "POST" })
  .validator((data) => {
    return {
      // @ts-ignore
      email: data.email,
      // @ts-ignore
      password: data.password,
    };
  })
  .handler(async ({ data }) => {
    const res = await auth.api.signInEmail({
      body: {
        email: data.email,
        password: data.password,
      },
    });
  });

export default function SigninForm() {
  const navigate = useNavigate();

  const form = createForm(() => ({
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: async ({ value }) => {
      try {
        await submit({
          data: {
            email: value.email,
            password: value.password,
          },
        });

        navigate({
          to: "/",
        });
      } catch {
        toast.error(`Signin failed`);
      }
    },
  }));

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
    >
      <div>
        <div class="h-22">
          <form.Field
            name="email"
            validators={{
              onBlur: ({ value }) => {
                if (!value) {
                  return "Email is required";
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <TextField
                value={field().state.value}
                onChange={field().handleChange}
                validationState={
                  field().state.meta.errors.length > 0 ? "invalid" : "valid"
                }
              >
                <TextFieldLabel>Email</TextFieldLabel>
                <TextFieldInput
                  type="email"
                  placeholder="example@example.com"
                />
                <TextFieldErrorMessage>
                  {field().state.meta.errors.join(",")}
                </TextFieldErrorMessage>
              </TextField>
            )}
          </form.Field>
        </div>
        <div class="h-22">
          <form.Field
            name="password"
            validators={{
              onBlur: ({ value }) => {
                if (!value) {
                  return "Password is required";
                }

                if (value.length < 8) {
                  return "Password must be at least 8 characters long.";
                }

                return undefined;
              },
            }}
          >
            {(field) => (
              <TextField
                value={field().state.value}
                onChange={field().handleChange}
                validationState={
                  field().state.meta.errors.length > 0 ? "invalid" : "valid"
                }
              >
                <TextFieldLabel>Password</TextFieldLabel>
                <TextFieldInput type="password" placeholder="********" />
                <TextFieldErrorMessage>
                  {field().state.meta.errors.join(",")}
                </TextFieldErrorMessage>
              </TextField>
            )}
          </form.Field>
        </div>
        <div class="grid pt-2">
          <form.Subscribe selector={(state) => [state.isSubmitting]}>
            {(states) => (
              <Button type="submit" disabled={states()[0]}>
                <Show when={states()[0]} fallback="Sign In">
                  <SvgSpinners3DotsMove />
                </Show>
              </Button>
            )}
          </form.Subscribe>
          <form.Subscribe
            selector={(state) => [state.isSubmitted, state.isSubmitSuccessful]}
          >
            {(states) => (
              <Show when={states()[0] && !states()[1]}>
                <p class="text-sm text-error-foreground">
                  Sign In failed due to server error.
                </p>
              </Show>
            )}
          </form.Subscribe>
        </div>
      </div>
    </form>
  );
}
