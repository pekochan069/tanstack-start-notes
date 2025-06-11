import { createFileRoute } from "@tanstack/solid-router";
import { createForm } from "@tanstack/solid-form";

import type { JSX } from "solid-js/jsx-runtime";
import type { ValidationError } from "@tanstack/solid-form";

export const Route = createFileRoute("/demo/form")({
  component: FormExample,
});

function FieldWrapper(props: {
  children: JSX.Element;
  errors: Array<ValidationError>;
  label: string;
}) {
  return (
    <div>
      <label for={props.label} class="block font-bold mb-1 text-xl">
        {props.label}
      </label>
      {props.children}
      {props.errors.length ? (
        <div class="text-red-500 mt-1 font-bold">{props.errors.join(", ")}</div>
      ) : null}
    </div>
  );
}

function FormExample() {
  const form = createForm(() => ({
    defaultValues: {
      fullName: "",
      email: "",
      address: {
        street: "",
        city: "",
        state: "",
        zipCode: "",
        country: "",
      },
      phone: "",
    },
    onSubmit: ({ value }) => {
      console.log(value);
      // Show success message
      alert("Form submitted successfully!");
    },
  }));

  return (
    <div
      class="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-100 to-blue-100 p-4 text-white"
      style={{
        "background-image":
          "radial-gradient(50% 50% at 5% 40%, #f4a460 0%, #8b4513 70%, #1a0f0a 100%)",
      }}
    >
      <div class="w-full max-w-2xl p-8 rounded-xl backdrop-blur-md bg-black/50 shadow-xl border-8 border-black/10">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          class="space-y-6"
        >
          {/* Full Name Field */}
          <div>
            <form.Field
              name="fullName"
              validators={{
                onBlur: ({ value }) => {
                  if (value.trim().length === 0) {
                    return "Full name is required";
                  }
                  if (value.length < 3) {
                    return "Name must be at least 3 characters";
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <FieldWrapper
                  label="Full Name"
                  errors={field().state.meta.errors}
                >
                  <input
                    id="fullName"
                    name="fullName"
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onChange={(e) => field().handleChange(e.target.value)}
                    class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </FieldWrapper>
              )}
            />
          </div>

          {/* Email Field */}
          <div>
            <form.Field
              name="email"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return "Email is required";
                  }
                  if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                    return "Invalid email address";
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <FieldWrapper
                  label="Email Address"
                  errors={field().state.meta.errors}
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onChange={(e) => field().handleChange(e.target.value)}
                    class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </FieldWrapper>
              )}
            />
          </div>

          {/* Street Address */}
          <div>
            <form.Field
              name="address.street"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return "Street address is required";
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <FieldWrapper
                  label="Street Address"
                  errors={field().state.meta.errors}
                >
                  <input
                    id="street"
                    name="street"
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onChange={(e) => field().handleChange(e.target.value)}
                    class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </FieldWrapper>
              )}
            />
          </div>

          {/* City, State, Zip in a row */}
          <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* City */}
            <form.Field
              name="address.city"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return "City is required";
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <FieldWrapper label="City" errors={field().state.meta.errors}>
                  <input
                    id="city"
                    name="city"
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onChange={(e) => field().handleChange(e.target.value)}
                    class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </FieldWrapper>
              )}
            />

            {/* State */}
            <form.Field
              name="address.state"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return "State is required";
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <FieldWrapper label="State" errors={field().state.meta.errors}>
                  <input
                    id="state"
                    name="state"
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onChange={(e) => field().handleChange(e.target.value)}
                    class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </FieldWrapper>
              )}
            />

            {/* Zip Code */}
            <form.Field
              name="address.zipCode"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return "Zip code is required";
                  }
                  if (!/^\d{5}(-\d{4})?$/.test(value)) {
                    return "Invalid zip code format";
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <FieldWrapper
                  label="Zip Code"
                  errors={field().state.meta.errors}
                >
                  <input
                    id="zipCode"
                    name="zipCode"
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onChange={(e) => field().handleChange(e.target.value)}
                    class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                </FieldWrapper>
              )}
            />
          </div>

          {/* Country */}
          <div>
            <form.Field
              name="address.country"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return "Country is required";
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <FieldWrapper
                  label="Country"
                  errors={field().state.meta.errors}
                >
                  <select
                    id="country"
                    name="country"
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onChange={(e) => field().handleChange(e.target.value)}
                    class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    <option value="">Select a country</option>
                    <option value="US">United States</option>
                    <option value="CA">Canada</option>
                    <option value="UK">United Kingdom</option>
                    <option value="AU">Australia</option>
                    <option value="DE">Germany</option>
                    <option value="FR">France</option>
                    <option value="JP">Japan</option>
                  </select>
                </FieldWrapper>
              )}
            />
          </div>

          {/* Phone Number */}
          <div>
            <form.Field
              name="phone"
              validators={{
                onBlur: ({ value }) => {
                  if (!value || value.trim().length === 0) {
                    return "Phone number is required";
                  }
                  if (
                    !/^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(
                      value,
                    )
                  ) {
                    return "Invalid phone number format";
                  }
                  return undefined;
                },
              }}
              children={(field) => (
                <FieldWrapper
                  label="Phone Number"
                  errors={field().state.meta.errors}
                >
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={field().state.value}
                    onBlur={field().handleBlur}
                    onChange={(e) => field().handleChange(e.target.value)}
                    class="w-full px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    placeholder="(123) 456-7890"
                  />
                </FieldWrapper>
              )}
            />
          </div>

          {/* Submit Button */}
          <div class="flex justify-end">
            <button
              type="submit"
              disabled={form.state.isSubmitting}
              class="px-6 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:opacity-50"
            >
              {form.state.isSubmitting ? "Submitting..." : "Submit"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
