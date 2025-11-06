const prompt = require('prompt-sync')();

var nums = [], num = NaN, swap = false, stop = 0, temp = 0;

while(true)
{
    num = prompt('Enter an integer (invalid integer to stop) = ');

    if(num.length > 0)
    {
        num = Number(num);

        if(isNaN(num) || num == null)
        {
            break;
        }
        else
        {
            nums.push(num);
        }
    }
    else
    {
        break;
    }
}

if(nums.length > 0)
{
    stop = nums.length - 1;

    while(true)
    {
        // bubble sort with premature termination
        swap = false        

        for(var i = 0; i < stop; i++)
        {
            if(nums[i] > nums[i+1])
            {
                temp = nums[i];
                nums[i] = nums[i+1];
                nums[i+1] = temp;

                swap = true;
            }
        }

        if(swap == false)
        {
            break;
        }
        else
        {
            stop--;
        }
    }

    console.log('Sorted numbers = ' + nums);
}
else
{
    console.log('No integer number was entered');
}