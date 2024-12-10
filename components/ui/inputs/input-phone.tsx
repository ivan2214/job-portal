"use client";

import type React from "react";
import { forwardRef } from "react";
import * as RPNInput from "react-phone-number-input";
import flags from "react-phone-number-input/flags";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { ChevronDown, Phone } from "lucide-react";

type InputPhoneProps = {
	id: string;
	label?: string;
	placeholder?: string;
	value?: string;
	onChange: (value: string) => void;
	disabled?: boolean;
};

export const InputPhoneField: React.FC<InputPhoneProps> = ({
	id,
	label = "Phone number input",
	placeholder = "Enter phone number",
	value,
	onChange,
	disabled = false,
}) => {
	return (
		<div className="space-y-2" dir="ltr">
			{label && <Label htmlFor={id}>{label}</Label>}
			<RPNInput.default
				className="flex rounded-lg shadow-black/5 shadow-sm"
				international
				flagComponent={FlagComponent}
				countrySelectComponent={CountrySelect}
				inputComponent={InputPhone}
				id={id}
				placeholder={placeholder}
				value={value}
				onChange={(newValue) => onChange(newValue ?? "")}
				disabled={disabled}
			/>
		</div>
	);
};

const InputPhone = forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
	({ className, ...props }, ref) => (
		<Input
			className={cn(
				"-ms-px rounded-s-none shadow-none focus-visible:z-10",
				className,
			)}
			ref={ref}
			{...props}
		/>
	),
);

InputPhone.displayName = "InputPhone";

type CountrySelectProps = {
	disabled?: boolean;
	value: RPNInput.Country;
	onChange: (value: RPNInput.Country) => void;
	options: { label: string; value: RPNInput.Country | undefined }[];
};

const CountrySelect: React.FC<CountrySelectProps> = ({
	disabled,
	value,
	onChange,
	options,
}) => {
	const handleSelect = (event: React.ChangeEvent<HTMLSelectElement>) => {
		onChange(event.target.value as RPNInput.Country);
	};

	return (
		<div className="relative inline-flex items-center self-stretch rounded-s-lg border border-input bg-background py-2 ps-3 pe-2 text-muted-foreground transition-shadow focus-within:z-10 focus-within:border-ring focus-within:outline-none focus-within:ring-[3px] focus-within:ring-ring/20 hover:bg-accent hover:text-foreground has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50">
			<div className="inline-flex items-center gap-1" aria-hidden="true">
				<FlagComponent country={value} countryName={value} aria-hidden="true" />
				<span className="text-muted-foreground/80">
					<ChevronDown size={16} strokeWidth={2} aria-hidden="true" />
				</span>
			</div>
			<select
				disabled={disabled}
				value={value}
				onChange={handleSelect}
				className="absolute inset-0 text-sm opacity-0"
				aria-label="Select country"
			>
				<option key="default" value="">
					Select a country
				</option>
				{options
					.filter((x) => x.value)
					.map((option, i) => (
						<option key={option.value ?? `empty-${i}`} value={option.value}>
							{option.label}{" "}
							{option.value &&
								`+${RPNInput.getCountryCallingCode(option.value)}`}
						</option>
					))}
			</select>
		</div>
	);
};

const FlagComponent = ({
	country,
	countryName,
}: { country?: string; countryName: string }) => {
	const Flag = country ? flags[country as keyof typeof flags] : null;
	return (
		<span className="w-5 overflow-hidden rounded-sm">
			{Flag ? (
				<Flag title={countryName} />
			) : (
				<Phone size={16} aria-hidden="true" />
			)}
		</span>
	);
};
