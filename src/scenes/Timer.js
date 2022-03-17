// This code is from https://github.com/ourcade/memory-match-template-phaser3

export default class Timer
{

	scene;
	label;
	timerEvent;
	duration = 0;

	constructor(scene, label)
	{
		this.scene = scene;
		this.label = label;
	}

	start(callback, duration = 10000)
	{
		this.stop();

		this.finishedCallback = callback;
		this.duration = duration;

		this.timerEvent = this.scene.time.addEvent({
			delay: duration,
			callback: () => {
				this.label.text = '0';

				this.stop();
				
				if (callback)
				{
					callback();
				}
			}
		})
	}

	stop()
	{
		if (this.timerEvent)
		{
			this.timerEvent.destroy();
			this.timerEvent = undefined;
		}
	}

	update()
	{
		if (!this.timerEvent || this.duration <= 0)
		{
			return
		}

		const elapsedInMil = this.timerEvent.getElapsed();
		const remaining = this.duration - elapsedInMil;

        // Milliseconds to seconds
        var seconds = Math.ceil(remaining / 1000);

        // Seconds to minutes
        var minutes = Math.floor(seconds/60);

        // Remainder back to seconds
        var partInSeconds = seconds%60;

        // Adds left zeros to seconds
        partInSeconds = partInSeconds.toString().padStart(2,'0');

        // Returns formated time
        var formattedTime = `${minutes}:${partInSeconds}`;

        this.label.text = formattedTime;
	}
}