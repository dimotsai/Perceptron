/**
 * Array shuffle
 * @param  {Array} o
 * @return {Array}
 */
function shuffle(o){
    for(var j, x, i = o.length; i; j = Math.floor(Math.random() * i), x = o[--i], o[i] = o[j], o[j] = x);
    return o;
};

/**
 * Clone an array
 * @return {Array}
 */
// Array.prototype.clone = function()
// {
//     return this.slice(0);
// }

function Position(elements)
{
    this.elements = elements;

    this.move = function(v)
    {
        for(var i in v.elements)
            this.elements[i] += v.get(i);
        return this;
    }

    this.addVector = function(v)
    {
        var elements = this.elements.slice(0);
        for(var i in v)
            elements[i] += v.get(i);
        return new Position(elements);
    }

    this.equal = function(elements)
    {
        return this.elements == v.elements;
    }

    this.get = function(dimention)
    {
        return this.elements[dimention];
    }

    this.setX = function(x)
    {
        this.elements[0] = x;
    }

    this.setY = function(y)
    {
        this.elements[1] = y;
    }

    this.setZ = function(z)
    {
        this.elements[2] = z;
    }

    this.getX = function()
    {
        return this.elements[0];
    }

    this.getY = function()
    {
        return this.elements[1];
    }

    this.getZ = function()
    {
        return this.elements[2];
    }

    this.getDimention = function()
    {
        return this.elements.length;
    }
}

function Vector(elements)
{
    this.elements = elements;

    this.add = function(v)
    {
        var elements = this.elements.slice(0);
        for(var i in elements)
        {
            elements[i] += v.get(i);
        }
        return new Vector(elements);
    }

    this.substract = function(v)
    {
        var elements = this.elements.slice(0);
        for(var i in elements)
        {
            elements[i] -= v.get(i);
        }
        return new Vector(elements);   
    };

    this.multiple = function(n)
    {
        var elements = this.elements.slice(0);
        for(var i in elements)
        {
            elements[i] *= n;
        }
        return new Vector(elements);   
    };

    this.interiorProduct = function(v)
    {
        var product = 0;
        var elements = this.elements.slice(0);
        for(var i in elements)
        {
            product += elements[i] * v.get(i);
        }
        return product;
    }

    this.equal = function(v)
    {
        return this.elements == v.elements;
    }

    this.get = function(dimention)
    {
        return this.elements[dimention];
    }

    this.setX = function(x)
    {
        this.elements[0] = x;
    }

    this.setY = function(y)
    {
        this.elements[1] = y;
    }

    this.setZ = function(z)
    {
        this.elements[2] = z;
    }

    this.getX = function()
    {
        return this.elements[0];
    }

    this.getY = function()
    {
        return this.elements[1];
    }

    this.getZ = function()
    {
        return this.elements[2];
    }
}


function Screen(canvas_id)
{
    var canvas = document.getElementById(canvas_id);
    var context = canvas.getContext("2d");
    var width = canvas.width;
    var height = canvas.height;
    var centerX = width/2;
    var centerY = height/2;
    var maxX = width - centerX; 
    var minX = 0 - centerX;
    var maxY = height - centerY;
    var minY = 0 - centerY;

    var defaultColor = "black";
    var axisColor = "red";

    var axisScale = 30;

    context.translate(0, height);
    // context.rotate(Math.PI);
    context.scale(1, -1);
    context.translate(centerX, centerY);

    context.scale(axisScale, axisScale);

    this.drawAxis = function()
    {
        var p1, p2;
        p1 = new Position([0, minY]);
        p2 = new Position([0, maxY]);
        this.drawLine(p1,p2, "red");
        p1 = new Position([minX, 0]);
        p2 = new Position([maxX, 0]);
        this.drawLine(p1,p2, "red");
    };

    this.drawPixel = function(position, fill, style)
    {
        context.beginPath();
        context.arc(position.getX(), position.getY(), 1/axisScale * 2, 0, 2*Math.PI);
        if(fill)
        {
            if(style) context.fillStyle = style;
            else context.fillStyle = defaultColor;
            context.fill();
        }
        else
        {
            if(style) context.strokeStyle = style;
            else context.strokeStyle = defaultColor;
            context.stroke();
            context.closePath();
        }
    };

    this.drawLine = function(p1, p2, color)
    {
        if(color) context.strokeStyle = color;
        else context.strokeStyle = defaultColor;
        context.beginPath();
        context.moveTo(p1.getX(), p1.getY());
        context.lineTo(p2.getX(), p2.getY());
        context.lineWidth=1/axisScale;
        context.stroke();
        context.closePath();
    };

    this.drawEquation = function(a, b, c, t)
    {
        var p1, p2;
        if(b == 0)
        {
            var x = (-t)*c/a;
            p1 = new Position([x, this.getMinY()]);
            p2 = new Position([x, this.getMaxY()]);
        }
        else if(a == 0)
        {
            var y = (-t)*c/b;
            p1 = new Position([this.getMinX(), y]);
            p2 = new Position([this.getMaxX(), y]);
        }
        else
        {
            //代入x=minX, x=maxX
            p1 = new Position([this.getMinX(), (-a*this.getMinX()-t*c)/b]);
            p2 = new Position([this.getMaxX(), (-a*this.getMaxX()-t*c)/b]);
        }
        this.drawLine(p1, p2);
    }

    this.clear = function()
    {
        context.clearRect(minX, minY, maxX-minX, maxY-minY);
    }

    this.getWidth = function()
    {
        return width;
    }

    this.getHeight = function()
    {
        return height;
    }

    this.getMaxX = function()
    {
        return maxX;  
    };

    this.getMinX = function()
    {
        return minX;  
    };

    this.getMaxY = function()
    {
        return maxY;  
    };

    this.getMinY = function()
    {
        return minY;  
    };
}

function Sample(position, group)
{
    this.position = position;
    this.group = group;

    this.getVector = function()
    {
        return new Vector(position.elements.slice(0));
    };
}

/**
 * Perceptron
 */
function Perceptron(threshold, rate, groups, weight)
{
    var threshold = threshold ? threshold : -1;
    /**
     * Perceptron weight
     * @type {Vector}
     */
    var weight = weight ? weight : new Vector([threshold, 0, 1]);
    /**
     * Learning rate
     * @type {Number}
     */
    var rate = rate ? rate : 0.8;

    var groups = groups ? groups : [0, 1];

    this.setLearningRate = function(r)
    {
        rate = r;
    }

    this.setGroups = function(g)
    {
        groups = g;
    }

    this.setWeight = function(w)
    {
        weight = w;
    }

    this.getGroups = function()
    {
        return groups;
    }

    this.getWeight = function()
    {
        return weight;
    }

    this.getTreshold = function()
    {
        return threshold;
    }

    this.caculateOutput = function(x)
    {
        return sgn(weight.interiorProduct(x));
    }

    this.getAccuracy = function(samples)
    {
        var total = samples.length;
        var correct = 0;

        for(var i in samples)
        {
            var vector = samples[i].getVector();
            vector.elements.unshift(threshold);
            if(samples[i].group == this.caculateOutput(vector)) correct++;
        }

        return correct/total;
    }

    this.train = function(sample, cycle, callback)
    {
        if( sample instanceof Sample )
        {
            adjustWeight(sample, callback);
        }
        else if( sample instanceof Array)
        {
            for(var i=0; i<cycle; i++)
            {
                adjustWeight(sample[ i%sample.length ], callback);
            }
        }
    }

    var init = function(screen_id)
    {
        canvas = document.getElementById(screen_id);
    }

    var adjustWeight = function(sample, callback)
    {
        var vector = sample.getVector();
        vector.elements.unshift(threshold);
        // console.log(weight.elements);
        if(sample.group == groups[0] && weight.interiorProduct(vector) < 0)
        {
            weight = weight.add(vector.multiple(rate));
            // console.log(1);
        }
        else if(sample.group == groups[1] && weight.interiorProduct(vector) >= 0)
            weight = weight.substract(vector.multiple(rate));
        else
            weight = weight;
        if(callback) callback(weight);

        // console.log(weight.elements);
        // console.log(sample.group, groups[0], weight.interiorProduct(vector));
    }

    var sgn = function(v)
    {
        if(v>0) return groups[0];
        else return groups[1];
    }
}

function TestPerceptron()
{
    this.test = function(){
        var v  = new Vector([1,2,3]);
        var u = new Vector([2,2,2]);

        var a = [1,2,3,4,5,6];

        console.log(a);

        shuffle(a);

        console.log(a);

        // console.log(v.add(u), v.interiorProduct(u), v.substract(u));
    };

    this.run = function()
    {
        var perceptron = new Perceptron();
        var screen = new Screen('screen');
        var weight = perceptron.getWeight();
        var threshold = perceptron.getTreshold();
        var duration = document.getElementById('duration').value;

        // screen.drawEquation(weight.get(1), weight.get(2), weight.get(0), threshold);
        screen.drawAxis();
        // screen.drawLine(new Position([1,1]), new Position([3,2]));
        // screen.drawLine(new Position([2,1]), new Position([2,3]), "red");
        // screen.drawLine(new Position([1.5,1]), new Position([2,3.5]), "green");
        document.getElementById('rate').onchange = function()
        {
            var rate = parseFloat(this.value);
            perceptron.setLearningRate(rate);
        };

        document.getElementById('duration').onchange = function()
        {
            duration = parseFloat(document.getElementById('duration').value);
        }

        document.getElementById('output').onchange = function()
        {
            this.scrollTop = this.scrollHeight;
        }

        document.getElementById('train').onclick = function()
        {
            var data = document.getElementById('train-data').value;
            var samples = parseData(data);
            var dimention = samples[0].position.getDimention();
            var threshold = perceptron.getTreshold();
            var initialWeight = new Array(dimention);
            for(var i=0; i<dimention;i++) initialWeight[i] = 0;
            initialWeight.unshift(threshold);

            if(dimention == 2)
            {
                initScreen(screen);
                drawSamples(screen, samples);
            }

            if(!samples.length) return false;

            perceptron.setWeight(new Vector(initialWeight));
            perceptron.setGroups(findGroups(samples));
            
            var weight = perceptron.getWeight();

            screen.drawEquation(weight.get(1), weight.get(2), weight.get(0), threshold);

            var entries = samples.slice(0);

            var condition_rd = parseInt(document.getElementById('condition-rd-value').value);
            var condition_acc = parseFloat(document.getElementById('condition-acc-value').value);

            var done = function()
            {
                document.getElementById('train-accuracy').value = perceptron.getAccuracy(samples);
            }

            var number=0;
            var round=0;

            document.getElementById('output').value = '';

            var training = function()
            {
                perceptron.train(entries[number % entries.length], null, function(w){
                    var threshold = perceptron.getTreshold();
                    var weight = perceptron.getWeight();
                    
                    if(dimention == 2)
                    {
                        initScreen(screen);
                        drawSamples(screen, samples);
                        screen.drawEquation(w.get(1), w.get(2), w.get(0), threshold);
                    }

                    document.getElementById('output').value += 
                    'n=' + (number+1) + '\tw=[' + w.elements.join(',\t') + ']\n';
                    document.getElementById('output').onchange();

                    if( (number % entries.length == entries.length - 1) ) round++;
                    if(round >= condition_rd && (number % entries.length == entries.length - 1) )
                        done();
                    else if( perceptron.getAccuracy(samples) >= condition_acc )
                        done();
                    else
                        setTimeout(training, duration);

                    number += 1;
                });
            };

            document.getElementById('train-accuracy').value = 'training';
            training();
        };

        document.getElementById('calculate').onclick = function()
        {            
            var data = document.getElementById('test-data').value;
            var samples = parseData(data);            
            var weight = perceptron.getWeight();
            var dimention = samples[0].position.getDimention();

            if(dimention == 2)
            {
                initScreen(screen);
                drawSamples(screen, samples);
                screen.drawEquation(weight.get(1), weight.get(2), weight.get(0), threshold);
            }

            document.getElementById('test-accuracy').value = perceptron.getAccuracy(samples);
        };

        document.getElementById('clear').onclick = function()
        {
            window.location.reload();
        };

        document.getElementById('file').onchange = function(event)
        {
            if (window.File && window.FileReader && window.FileList && window.Blob) {
                var files = event.target.files;
                var reader = new FileReader();
                reader.onload = (function(f){
                    return function(e)
                    {
                        document.getElementById('input').innerText = e.target.result;
                        divideData(e.target.result);
                    };
                })(files[0]);

                reader.readAsText(files[0]);
            } else {
              alert('The File APIs are not fully supported in your browser.\nPlease copy the sample to the input area.');
            }
        }

        document.getElementById('divide').onclick = function()
        {
            divideData(document.getElementById('input').value);
        }
    };

    var parseData = function(str)
    {
        var ret = [];
        var samples = str.split('\n');
        for(var i in samples)
        {
            if(samples[i] == '') continue;

            var entry = samples[i].match(/[+\-]?\d+(\.\d+)?/g);

            for(var j in entry) entry[j] = parseFloat(entry[j]);

            ret.push(new Sample(
                new Position(entry.slice(0, entry.length - 1)),
                entry[entry.length - 1]
            ));
        }
        return ret;
    };

    var divideData = function(str)
    {
        var samples = str.split('\n');

        var length = samples.length;

        var train_count = Math.floor(length*2/3);

        var test_count = length - train_count;

        var train_data = '', test_data = '';

        shuffle(samples);

        for(var i=0; i<train_count; i++)
            train_data += samples.shift() + '\n';

        for(var i=0; i<test_count; i++)
            test_data += samples.shift() + '\n';

        document.getElementById('train-data').innerText = train_data;
        document.getElementById('test-data').innerText = test_data;
    }

    var findGroups = function(samples)
    {
        var groups = [];
        for(var i in samples)
        {
            if( groups.indexOf(samples[i].group) == -1) groups.push(samples[i].group);
        }
        return groups;
    };

    var drawSamples = function(screen, samples)
    {
        var groups = findGroups(samples);
        for(var i in samples)
        {
            screen.drawPixel(samples[i].position, true, samples[i].group == groups[0] ? 'blue' : 'green');
        }
    }

    var initScreen = function(screen)
    {
        screen.clear();
        screen.drawAxis();
    }
}

var app =  new TestPerceptron();
// app.test();
app.run();