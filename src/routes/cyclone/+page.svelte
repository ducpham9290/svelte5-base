<script lang="ts">
	import { onMount } from 'svelte';
	import houseSvg from '$lib/assets/house.svg';
	import cloudSvg from '$lib/assets/cloud.svg';
	import treeSvg from '$lib/assets/tree.svg';
	import oceanWavesSvg from '$lib/assets/ocean-waves.svg';
	import hillsSvg from '$lib/assets/hills.svg';
	import cycloneSvg from '$lib/assets/cyclone.svg';

	onMount(() => {
		// Animate the energy transfer arrows
		const animateArrows = () => {
			const oceanArrow = document.getElementById('ocean-arrow');
			const landArrow = document.getElementById('land-arrow');
			const stormArrow = document.getElementById('storm-arrow');

			if (oceanArrow) {
				oceanArrow.style.animation = 'pulse 2s ease-in-out infinite';
			}
			if (landArrow) {
				landArrow.style.animation = 'pulse 2s ease-in-out infinite 0.5s';
			}
			if (stormArrow) {
				stormArrow.style.animation = 'moveRight 3s ease-in-out infinite';
			}
		};

		animateArrows();
	});
</script>

<svelte:head>
	<style>
		@keyframes pulse {
			0%,
			100% {
				opacity: 0.6;
				transform: scale(1);
			}
			50% {
				opacity: 1;
				transform: scale(1.1);
			}
		}

		@keyframes moveRight {
			0% {
				transform: translateX(0);
				opacity: 0.7;
			}
			50% {
				transform: translateX(20px);
				opacity: 1;
			}
			100% {
				transform: translateX(0);
				opacity: 0.7;
			}
		}

		@keyframes rotate {
			from {
				transform: rotate(0deg);
			}
			to {
				transform: rotate(360deg);
			}
		}

		.cyclone-spin {
			animation: rotate 4s linear infinite;
		}

		.wave-animation {
			animation: wave 2s ease-in-out infinite;
		}

		@keyframes wave {
			0%,
			100% {
				transform: translateY(0);
			}
			50% {
				transform: translateY(-5px);
			}
		}
	</style>
</svelte:head>

<div class="min-h-screen bg-gradient-to-b from-yellow-100 to-yellow-50">
	<!-- Sky with clouds -->
	<div class="relative h-32 bg-gradient-to-b from-yellow-100 to-yellow-50">
		<!-- Cloud 1 -->
		<img src={cloudSvg} alt="Cloud" class="absolute top-2 left-8 h-16 w-32 opacity-80" />

		<!-- Cloud 2 -->
		<img src={cloudSvg} alt="Cloud" class="absolute top-4 right-12 h-20 w-40 opacity-80" />
	</div>

	<!-- Main content area -->
	<div class="flex h-96">
		<!-- Ocean Section (Left) -->
		<div class="relative flex-1 bg-gradient-to-b from-blue-600 to-blue-800">
			<!-- Ocean waves -->
			<div class="absolute bottom-0 h-16 w-full bg-gradient-to-t from-blue-400 to-blue-600">
				<img
					src={oceanWavesSvg}
					alt="Ocean waves"
					class="wave-animation absolute bottom-0 h-8 w-full"
				/>
			</div>

			<!-- Large Cyclone over Ocean -->
			<div class="absolute top-16 left-8 h-32 w-32">
				<img src={cycloneSvg} alt="Cyclone" class="cyclone-spin h-full w-full" />
			</div>

			<!-- Energy arrow from ocean to cyclone -->
			<div
				id="ocean-arrow"
				class="absolute top-32 left-16 h-2 w-8 rotate-45 transform bg-orange-500"
			></div>
			<div
				id="ocean-arrow"
				class="absolute top-30 left-18 h-2 w-6 rotate-45 transform bg-orange-400"
			></div>

			<!-- Vietnamese text -->
			<div
				class="bg-opacity-30 absolute top-4 left-4 rounded bg-black px-2 py-1 text-sm font-semibold text-white"
			>
				Nguồn năng lượng từ biển
			</div>
		</div>

		<!-- Land Section (Right) -->
		<div class="relative flex-1 bg-gradient-to-b from-green-200 to-green-400">
			<!-- Rolling hills background -->
			<div class="absolute top-0 h-24 w-full bg-gradient-to-b from-green-300 to-green-400">
				<img src={hillsSvg} alt="Hills" class="absolute top-0 h-full w-full" />
			</div>

			<!-- House -->
			<div class="absolute top-20 left-1/2 -translate-x-1/2 transform">
				<img src={houseSvg} alt="House" class="h-8 w-10" />
			</div>

			<!-- Trees -->
			<div class="absolute top-16 left-1/2 -translate-x-8 transform">
				<img src={treeSvg} alt="Tree" class="h-8 w-5" />
			</div>
			<div class="absolute top-16 left-1/2 translate-x-4 transform">
				<img src={treeSvg} alt="Tree" class="h-8 w-5" />
			</div>

			<!-- Ground texture -->
			<div class="absolute bottom-0 h-16 w-full bg-gradient-to-t from-yellow-600 to-yellow-400">
				<div class="absolute bottom-2 left-4 h-1 w-8 bg-yellow-500 opacity-60"></div>
				<div class="absolute bottom-4 left-12 h-1 w-6 bg-yellow-500 opacity-60"></div>
				<div class="absolute bottom-3 left-20 h-1 w-10 bg-yellow-500 opacity-60"></div>
			</div>

			<!-- Weakened Cyclone over Land -->
			<div class="absolute top-20 right-8 h-20 w-20">
				<img
					src={cycloneSvg}
					alt="Weakened Cyclone"
					class="cyclone-spin h-full w-full opacity-60"
					style="animation-duration: 6s;"
				/>
			</div>

			<!-- Energy arrow from cyclone to land (downward) -->
			<div
				id="land-arrow"
				class="absolute top-32 right-12 h-2 w-8 rotate-135 transform bg-orange-500"
			></div>
			<div
				id="land-arrow"
				class="absolute top-34 right-14 h-2 w-6 rotate-135 transform bg-orange-400"
			></div>

			<!-- Vietnamese text -->
			<div
				class="bg-opacity-30 absolute top-4 right-4 rounded bg-black px-2 py-1 text-sm font-semibold text-white"
			>
				Suy yếu dần
			</div>
		</div>
	</div>

	<!-- Horizontal storm movement arrow -->
	<div class="relative h-8 bg-gradient-to-r from-blue-200 to-green-200">
		<div
			id="storm-arrow"
			class="absolute top-2 left-1/2 h-2 w-16 -translate-x-1/2 transform bg-orange-500"
		></div>
		<div
			id="storm-arrow"
			class="absolute top-1 left-1/2 h-4 w-2 -translate-x-1/2 transform bg-orange-500"
			style="margin-left: 14px;"
		></div>
	</div>

	<!-- Description -->
	<div class="bg-white p-8">
		<h1 class="mb-4 text-center text-3xl font-bold text-gray-800">
			Tropical Cyclone Energy Dynamics
		</h1>
		<div class="mx-auto max-w-4xl">
			<div class="grid grid-cols-1 gap-8 md:grid-cols-2">
				<div class="rounded-lg border-l-4 border-blue-500 bg-blue-50 p-6">
					<h3 class="mb-2 text-xl font-semibold text-blue-800">Ocean Phase</h3>
					<p class="text-gray-700">
						The cyclone gains energy from warm ocean waters, creating a powerful rotating system
						with strong winds and low pressure.
					</p>
				</div>
				<div class="rounded-lg border-l-4 border-green-500 bg-green-50 p-6">
					<h3 class="mb-2 text-xl font-semibold text-green-800">Land Phase</h3>
					<p class="text-gray-700">
						As the cyclone moves over land, it loses its energy source and gradually weakens due to
						friction and lack of warm water.
					</p>
				</div>
			</div>
		</div>
	</div>
</div>
