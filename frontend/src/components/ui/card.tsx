import { cn } from "@/lib/utils"
import { splitProps, type ComponentProps, type ParentComponent } from "solid-js"

export const Card: ParentComponent<ComponentProps<"div">> = (props) => {
	const [local, rest] = splitProps(props, ["class"])
	return (
		<div
			class={cn(
				"rounded-xl border border-slate-200 bg-white text-slate-950 shadow dark:border-slate-800 dark:bg-slate-950 dark:text-slate-50",
				local.class
			)}
			{...rest}
		/>
	)
}

export const CardHeader: ParentComponent<ComponentProps<"div">> = (props) => {
	const [local, rest] = splitProps(props, ["class", "classList"])
	return (
		<div
			class={cn("flex flex-col space-y-1.5 p-6", local.class)}
			{...rest}
		/>
	)
}

export const CardTitle: ParentComponent<ComponentProps<"h3">> = (props) => {
	const [local, rest] = splitProps(props, ["class", "classList"])
	return (
		<h3
			class={cn("font-semibold leading-none tracking-tight", local.class)}
			{...rest}
		/>
	)
}

export const CardDescription: ParentComponent<ComponentProps<"h3">> = (
	props
) => {
	const [local, rest] = splitProps(props, ["class", "classList"])
	return (
		<h3
			class={cn("text-sm text-slate-500 dark:text-slate-400", local.class)}
			{...rest}
		/>
	)
}

export const CardContent: ParentComponent<ComponentProps<"div">> = (props) => {
	const [local, rest] = splitProps(props, ["class", "classList"])
	return <div class={cn("p-6 pt-0", local.class)} {...rest} />
}

export const CardFooter: ParentComponent<ComponentProps<"div">> = (props) => {
	const [local, rest] = splitProps(props, ["class", "classList"])
	return (
		<div class={cn("flex items-center p-6 pt-0", local.class)} {...rest} />
	)
}
