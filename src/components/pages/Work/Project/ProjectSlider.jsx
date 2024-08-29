import Video from "@/components/common/VideoFormat";
import { getLenis, resetLenis } from "@/components/core/lenis";
import { lerp, parseRem, sawtooth, xSetter } from "@/js/utils";
import { useState, useEffect, useRef } from "react";

const ProjectSlider = ({ allProject, ...props }) => {
	let currScroll = 0;
	let time = 0;
	let direction = 1;
	let isDevMode = false;

	useEffect(() => {
		resetLenis(window.innerWidth > 991 ? true : false)
		const lenis = getLenis();

		lenis.on("scroll", (e) => {
			let targetScroll = currScroll + e.direction * 3.5 * Math.abs(e.velocity);
			currScroll = lerp(currScroll, targetScroll, 0.05);
			direction = e.direction;
		});

		return () => {
			lenis.off("scroll");
		};
	}, []); //Lenis

	useEffect(() => {
		const target = {
			wrapper: document.querySelector(".work-project-thumb"),
			allThumbs: Array.from(document.querySelectorAll(".work-project-thumb-item")),
			pagiWrapper: document.querySelector(".work-project-pagi-wrapper"),
			allPagination: Array.from(document.querySelectorAll(".work-project-pagi-item")),
			testProcess: document.querySelector(".work-project-pagi .test-process"),
			testPos: document.querySelector(".work-project-pagi .test-pos")
		};
		if (!isDevMode) {
			target.testPos.classList.remove('isDev')
		}
		let raf;

		function translateThumbFunc() {
			let projectDomHeight = target.wrapper.clientWidth;
			document.querySelector(".work-project").style.height = `${projectDomHeight * 4}px`;

			let initPos = Array.from(target.allThumbs, (el) => 0);
			let expandWidth = parseRem(
				10 *
				parseFloat(
					window
						.getComputedStyle(target.wrapper)
						.getPropertyValue("--expand-w"),
				),
			);
			let pagiWrapperOffsetLeft = target.pagiWrapper.getBoundingClientRect().left;
			let pagiWrapperWidth = target.pagiWrapper.getBoundingClientRect().width;

			function translateThumb() {
				time += (direction > 0 ? -1 : 1) / 2;
				let wrapperWidth = target.wrapper.clientWidth;
				let scrollPos = -currScroll + time;
				let process = sawtooth(Math.abs((-wrapperWidth * 20 + scrollPos) / wrapperWidth), 1,);
				let processOffset = (-wrapperWidth * 20 + scrollPos) / wrapperWidth;

				target.allThumbs.forEach((el, idx) => {
					let targetImg = el.querySelector(".work-project-thumb-item-img img");
					const { left, width, right } = el.getBoundingClientRect();
					if (right < -window.innerWidth / 2) {
						let multiply =
							Math.floor(-scrollPos / wrapperWidth) +
							(idx === target.allThumbs.length - 1 ? 0 : 1);
						initPos[idx] = wrapperWidth * multiply;
					}
					if (right > wrapperWidth - window.innerWidth / 2) {
						let multiply = Math.floor(-scrollPos / wrapperWidth);
						initPos[idx] = wrapperWidth * multiply;
					}
					let normalizeOffset = (right / (window.innerWidth + width) - 0.5) * 2;
					if (left > -window.innerWidth / 2 && right < window.innerWidth * 3 / 2) {
						xSetter(targetImg)((-normalizeOffset * expandWidth) / 2);
					}
					xSetter(el)(scrollPos + initPos[idx]);
				});

				xSetter(target.testProcess)(process * target.pagiWrapper.getBoundingClientRect().width)

				target.allPagination.forEach((el, idx) => {
					const { left, width } = el.getBoundingClientRect();
					let leftProcess = (left - pagiWrapperOffsetLeft) / pagiWrapperWidth;
					let midProcess = (left - pagiWrapperOffsetLeft + width / 2) / pagiWrapperWidth;
					// let normalizeProcess = (((process - midProcess) * target.allPagination.length) - .5) * 2;
					// let limitProcess = Math.max(Math.min(normalizeProcess, 3), -3)
					// let pagiProcess = process / (leftProcess);
					let limit = 2.5

					let test = Math.max(Math.min((process - midProcess) * target.allPagination.length, limit), -limit) / limit

					if (idx == 1) {
						if (isDevMode) {
							target.testPos.innerHTML = process
						}
					}
					el.style.setProperty('--radius', test);
				});


				raf = window.requestAnimationFrame(translateThumb);
			}

			raf = window.requestAnimationFrame(translateThumb);
		}

		function cloneInfinityDOM() {
			let cloner = target.wrapper.cloneNode(true)
			cloner.classList.add('cloneDOM')
			target.wrapper.parentNode.append(cloner)
		}

		if (window.innerWidth > 991) {
			translateThumbFunc()
		} else {
			// cloneInfinityDOM()
		}

		return () => {
			window.cancelAnimationFrame(raf);
		};
	}, []);

	return (
		<>
			<div className="work-project-thumb container grid">
				{allProject.map((proj, idx) => (
					<div className="work-project-thumb-item" key={proj.name + idx}>
						<div className="work-project-thumb-item-img">
							{proj.thumbType == 'image' && (
								<img src={proj.thumb.src} alt="" className="img img-fill" />
							)}
							{proj.thumbType == 'video' && (
								<Video src={proj.thumb} className={'img img-fill'} />
							)}
						</div>
					</div>
				))}
			</div>
			<div className="work-project-pagi">
				<div className="work-project-pagi-wrapper">
					<div className="test-process txt-24"></div>
					<div className="test-pos txt-24 isDev">1</div>
					{allProject.map((proj, idx) => (
						<div className="work-project-pagi-item" key={proj.name + idx}>
							<div className="work-project-pagi-item-inner"></div>
						</div>
					))}
				</div>
			</div>
		</>
	);
};

export default ProjectSlider;
