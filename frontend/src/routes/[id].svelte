<script context="module" lang='ts'>
    //@ts-ignore
    export function load({ url, params }) {
        return {
            props: {
                id: params.id
            }
        };
    }
  </script>
  <script lang='ts'>
import { goto } from "$app/navigation";
import { onMount } from "svelte";


    export let id : string;

    onMount(() => {
        if(!id.startsWith('@')) {
            goto('/error');
        }
    })
    
  </script>
  
<div class='w-screen h-full absolute bg-[#08090D] flex flex-row justify-center overflow-x-hidden'>
	<div class='flex flex-col px-12 py-12 items-center overflow-y-scroll '>
		<div class='w-[400px] sm:w-[555px] min-h-[250px] bg-[#1E1E1E] rounded-md hover:shadow-lg hover:-translate-y-2 duration-300 ease-in-out'>
			<div class='banner w-full h-1/2 relative bg-blue-200 rounded-tl-md rounded-tr-md flex items-center'>
				<div class='profile w-20 h-20 rounded-full bg-black relative ml-6'>
					<div class='w-6 h-6 bg-blue-500 bottom-1 right-1 rounded-full absolute text-white font-bold flex justify-center items-center shadow-lg'>
						<svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2">
							<path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
						  </svg>
					</div>
				</div>
			</div>
			<div class='information w-full h-1/2 px-4 py-4 text-white'>
				<h1 class='font-bold'>Marques Scripps</h1>
				<h2 class='text-sm'>@MarquesCoding</h2>
				<h3 class='text-xs pt-2 opacity-75'>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Pellentesque elit eget gravida cum sociis natoque penatibus. </h3>
			</div>
		</div>
		<div class='w-[360px] sm:w-[450px] min-h-[85px] bg-[#1E1E1E] rounded-md hover:shadow-lg hover:-translate-y-2 duration-300 ease-in-out mt-4 flex flex-col pl-4 text-white font-bold'>
			<div class='flex flex-row  items-center text-center h-full w-auto'>
				<div class='w-[30px] h-[30px] rounded-full relative '>
					<svg class='' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"></path></svg>
				</div>
				<h1 class='pl-4'>MarquesCoding</h1>
			</div>
		</div>
        <div class='w-[360px] sm:w-[450px] min-h-[85px] bg-[#1E1E1E] rounded-md hover:shadow-lg hover:-translate-y-2 duration-300 ease-in-out mt-4 flex flex-col pl-4 text-white font-bold'>
			<div class='flex flex-row  items-center text-center h-full w-auto'>
				<div class='w-[30px] h-[30px] rounded-full relative '>
					<svg class='' xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M11.64 5.93h1.43v4.28h-1.43m3.93-4.28H17v4.28h-1.43M7 2L3.43 5.57v12.86h4.28V22l3.58-3.57h2.85L20.57 12V2m-1.43 9.29l-2.85 2.85h-2.86l-2.5 2.5v-2.5H7.71V3.43h11.43Z"></path></svg>
				</div>
				<h1 class='pl-4'>MarquesCoding</h1>
			</div>
		</div>

		<div class='w-[360px] sm:w-[450px] min-h-[85px] bg-[#1E1E1E] rounded-md hover:shadow-lg hover:-translate-y-2 duration-300 ease-in-out mt-4 flex flex-col pl-4 text-white font-bold'>
			<div class='flex flex-row  items-center text-center h-full w-auto'>
				<div class='w-[30px] h-[30px] rounded-full relative '>
					<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img"  width="32" height="32" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="m10 15l5.19-3L10 9v6m11.56-7.83c.13.47.22 1.1.28 1.9c.07.8.1 1.49.1 2.09L22 12c0 2.19-.16 3.8-.44 4.83c-.25.9-.83 1.48-1.73 1.73c-.47.13-1.33.22-2.65.28c-1.3.07-2.49.1-3.59.1L12 19c-4.19 0-6.8-.16-7.83-.44c-.9-.25-1.48-.83-1.73-1.73c-.13-.47-.22-1.1-.28-1.9c-.07-.8-.1-1.49-.1-2.09L2 12c0-2.19.16-3.8.44-4.83c.25-.9.83-1.48 1.73-1.73c.47-.13 1.33-.22 2.65-.28c1.3-.07 2.49-.1 3.59-.1L12 5c4.19 0 6.8.16 7.83.44c.9.25 1.48.83 1.73 1.73Z"></path></svg>
				</div>
				<h1 class='pl-4'>Marques</h1>
			</div>
		</div>

		<div class='w-full h-10 bottom-0 absolute mt-12 text-center text-white font-semibold opacity-20'>codebio.dev &copy; 2022</div>
		
	</div>
</div>
