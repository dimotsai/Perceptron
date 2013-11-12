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

function randomInit(arr)
{
    var ret = arr.slice(0);
    for(var i=0; i<arr.length; i++)
    {
        ret[i] = Math.random();
    }
    return ret;
}

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

    this.set = function(dimention, v)
    {
        this.elements[dimention] = v;
        return this.elements[dimention];
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

function Weight(dimention)
{
    var dimention = dimention ? dimention : 2;

    var vector = new Vector(new Array(dimention));

    this.set = function(_vector)
    {
        vector = _vector;
    }

    this.get = function()
    {
        return vector;
    }
}

/**
 * Perceptron
 */
function Perceptron()
{
    /**
     * Perceptron weight
     * @type {Vector}
     */
    var weight = new Vector([-1, 0, 1]);
    /**
     * Learning rate
     * @type {Number}
     */
    var rate = 0.8;

    var groups = [0, 1];

    var input = new Vector([-1, 0, 0]);

    var output = 0;

    var gradient = 0;

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
        return weight.get(0);
    }

    this.caculateOutput = function(x)
    {
        input = x;
        output = 1.0/(1.0+Math.exp( -weight.interiorProduct(x) ));
        return output;
    }

    this.getOutput = function()
    {
        return output;
    }

    this.calculateGradientOfOutputLayer = function(expect)
    {
        gradient = (expect - output)*output*(1-output);
        return gradient;
    }

    this.calculateGradient = function(gradients, weights)
    {
        var sum = 0;
        for(var i in gradients)
        {
            sum += gradients[i] * weights[i];
        }
        gradient = output*(1-output)*sum;
        return gradient;
    }

    this.getGradient = function()
    {
        return gradient;
    }

    this.adjustWeight = function(callback)
    {
        //console.log(rate, gradient);
        weight = weight.add(input.multiple(rate*gradient));
        if(callback) callback(weight);
    }
}

function TestPerceptron()
{
    var screen;
    var samples;
    var test_samples;
    var self = this;
    var groups = [];
    var perceptrons;
    var rate = 0.8;
    var adj, adj_reversed;
    var chunks;
    var threshold = -1;
    var Eav = 0;

    this.setup = function()
    {
        screen = new Screen('screen');

        document.getElementById('output').onchange = function()
        {
            this.scrollTop = this.scrollHeight;
        }

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

        document.getElementById('init').onclick = function()
        {
            screen.clear();
            screen.drawAxis();
            divideData(document.getElementById('input').value);
            samples = parseData(document.getElementById('train-data').value);
            test_samples = parseData(document.getElementById('test-data').value);
            drawSamples(screen, samples);
            self.init();
        }

        document.getElementById('train').onclick = function()
        {
            var con_round = parseInt(document.getElementById('condition-rd-value').value);
            var con_eav = parseFloat(document.getElementById('condition-eav-value').value);
            // for(var i=0; i<con_round; i++)
            // {
            //     var eav = self.train();
            //     log('Round ' + i + ': Eav=' +eav);
            //     if(eav < con_eav) break;
            // }
            var i=0;
            var training = function()
            {
                var ret = self.train();
                log('Round ' + i + ': Eav=' +ret.Eav + ', Acc:' + ret.Acc);
                i++;
                if(i < con_round && ret.Eav > con_eav) setTimeout(training, 0);
            }
            training();
        }

        document.getElementById('test').onclick = function()
        {
            screen.clear();
            screen.drawAxis();
            self.test();
        }
    }

    this.init = function(){
        groups = findGroups(samples);
        perceptrons;
        rate = 0.5;
        adj, adj_reversed;
        chunks;
        threshold = -1;

        //step1. 決定網路架構
        //var input_count = parseInt(prompt('輸入層個數'));
        var hidden_layer_count = parseInt(prompt('隱藏層層數'));
        var hidden_count = [];
        for(var i=0; i<hidden_layer_count; i++)
        {
            hidden_count.push(parseInt(prompt('第' + (i+1) + '隱藏層個數')));
        }
        var output_count = parseInt(prompt('輸出層層數'));

        var layout_count = hidden_count;
        //layout_count.unshift(input_count);
        layout_count.push(output_count);
        alert('各層數: ' + layout_count.toString());

        var sum = layout_count.reduce(function(pv, cv){return pv+cv});
        alert('神經元數: ' + sum.toString());

        //step2. 初始化
        adj          = new Array(sum);
        adj_reversed = new Array(sum);
        chunks       = new Array(layout_count.length);
        perceptrons  = new Array(sum);
        
        //assign every perceptron to each layer.
        for(var i=0, start=0; i<layout_count.length; start += layout_count[i], i++)
        {
            chunks[i] = new Array();
            for(var j=0; j<layout_count[i]; j++)
                chunks[i].push(j + start);
        }
        
        //build adjacency list
        for(var i=1; i<chunks.length; i++)
        {
            var prev = chunks[i-1];
            for(j=0; j<chunks[i].length; j++)
            {
                adj[chunks[i][j]] = prev;
            }
        }

        //build reversed adjacency list
        for(var i=0; i<chunks.length-1; i++)
        {
            var next = chunks[i+1];
            for(j=0; j<chunks[i].length; j++)
            {
                adj_reversed[chunks[i][j]] = next;
            }
        }
        //first layer perceptrons
        for(var i=0; i<chunks[0].length; i++)
        {
            var dim = samples[0].position.getDimention();
            var v = new Vector(randomInit(new Array(dim + 1)));// depend on samples
            v.set(0, threshold); //set threshold
            perceptrons[chunks[0][i]] = new Perceptron();
            perceptrons[chunks[0][i]].setWeight(v)
        }
        
        //other layer perceptrons
        for(var i=1; i<chunks.length; i++)
        {
            var prev_dimention = chunks[i-1].length;
            for(j=0; j<chunks[i].length; j++)
            {
                var v = new Vector(randomInit(new Array(prev_dimention + 1)));// prev layer dimention
                v.set(0, threshold); //set threshold
                perceptrons[chunks[i][j]] = new Perceptron();
                perceptrons[chunks[i][j]].setWeight(v);
            }
        }

        // console.log(chunks);
        // console.log(adj);
        // console.log(perceptrons);
    };

    this.train = function()
    {
        Eav = 0;
        var correct_count = 0;
        for(var sample_index in samples)
        {
            //console.log('----sample ' + sample_index + '----');
            //step3. 前饋階段
            //  3.1 first layer
            for(var i=0; i<chunks[0].length; i++)
            {
                var vector = samples[sample_index].getVector();
                vector.elements.unshift(threshold);
                perceptrons[chunks[0][i]].caculateOutput(vector);
            }
            //  3.2 others
            for(var i=chunks[0].length; i<perceptrons.length;i++)
            {
                var input = new Array();
                for(var j=0; j<adj[i].length; j++)
                {
                    input.push(perceptrons[adj[i][j]].getOutput());
                }
                input.unshift(threshold);// push threshold
                input = new Vector(input);
                perceptrons[i].caculateOutput(input);
            }
            //  3.3 console.log(output)
            for(var i in chunks[chunks.length-1])
            {
                var output = perceptrons[chunks[chunks.length-1][i]].getOutput();
                var correct = samples[sample_index].group==findOutputGroup(groups, output);
                if(correct) correct_count++;
                //console.log('y' + chunks[chunks.length-1][i] + ':' + output);
                //console.log('output: ' + findOutputGroup(groups, output))
            }

            //step4. 倒傳遞階段
            //  4.1 last layer
            for(var i=0; i<chunks[chunks.length-1].length; i++)
            {
                var expect = groups.indexOf(samples[sample_index].group)/(groups.length-1);
                var index = chunks[chunks.length-1][i];
                perceptrons[index].calculateGradientOfOutputLayer(expect);
            }
            //  4.2 other layers
            for(var i=perceptrons.length-chunks[chunks.length-1].length-1; i>=0; i--)
            {
                var gradients = new Array(), weights = new Array();
                for(var j=0; j<adj_reversed[i].length; j++)
                {
                   var index = adj_reversed[i][j];
                   var weight = perceptrons[index].getWeight();
                   var gradient = perceptrons[index].getGradient();
                   weights.push(weight.get(adj[index].indexOf(i) + 1));
                   gradients.push(gradient);
                }
                perceptrons[i].calculateGradient(gradients, weights);
                // console.log('p' + i + ':' , gradients, weights);
            }

            //step5. 調整鍵結值
            for(var i=0; i<perceptrons.length; i++)
            {
                var before = perceptrons[i].getWeight();
                perceptrons[i].adjustWeight(/*function(after){
                    console.log('w' + i + ': [' + before.elements.toString() + '] -> [' + after.elements.toString() + ']');
                }*/);
            }

            for(var i in perceptrons)
            {
                //console.log('n' + i + ': ' + perceptrons[i].getGradient());
            }

            //step6. 收斂條件測試
            //error
            var Error = 0 ;
            for(var i=0; i<chunks[chunks.length-1].length; i++)
            {
                var expect = groups.indexOf(samples[sample_index].group)/(groups.length-1);
                var index = chunks[chunks.length-1][i];
                var e = expect - perceptrons[index].getOutput();
                Error += e*e;
            }
            Error /= 2;
            Eav += Error;
            //console.log('expect: ' + samples[sample_index].group);
            //console.log('E: ' + Error);
            //console.log('------------------');
        }
        Eav /= samples.length
        //console.log('Eav:' + Eav);
        return {Eav: Eav, Acc: correct_count/samples.length};
    }

    this.test = function()
    {
        var correct_count = 0;
        for(var sample_index in test_samples){
            //step3. 前饋階段
            //  3.1 first layer
            for(var i=0; i<chunks[0].length; i++)
            {
                var vector = test_samples[sample_index].getVector();
                vector.elements.unshift(threshold);
                perceptrons[chunks[0][i]].caculateOutput(vector);
            }
            //  3.2 others
            for(var i=chunks[0].length; i<perceptrons.length;i++)
            {
                var input = new Array();
                for(var j=0; j<adj[i].length; j++)
                {
                    input.push(perceptrons[adj[i][j]].getOutput());
                }
                input.unshift(threshold);// push threshold
                input = new Vector(input);
                perceptrons[i].caculateOutput(input);
            }
            //  3.3 console.log(output)
            for(var i in chunks[chunks.length-1])
            {
                var output = perceptrons[chunks[chunks.length-1][i]].getOutput();
                var correct = test_samples[sample_index].group==findOutputGroup(groups, output);
                if(correct) correct_count++;
                drawSample(screen, test_samples[sample_index], findOutputGroup(groups, output));
                log('test_sample' + sample_index + '\t' + (correct?'CORRECT':'WRONG') + '\texpect: ' + test_samples[sample_index].group + ', output: ' + findOutputGroup(groups, output));
            }
        }
        log('Test Acc: ' + correct_count/test_samples.length);
    }

    this.run = function()
    {
        
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

    var findOutputGroup = function(groups, output)
    {
        var length = groups.length;
        var index = Math.floor(output*length);
        return groups[index];
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
        var length = groups.length;
        var color = Math.round(0x7FFFFF/(length-1));
        if(samples[0].position.getDimention() != 2) return false;
        for(var i in samples)
        {
            var c = (color*groups.indexOf(samples[i].group)).toString(16);
            var cc = ("000000" + c).substring(c.length, c.length + 6);
            screen.drawPixel(samples[i].position, true, '#' + cc);
        }
    }

    var drawSample = function(screen, sample, group)
    {
        var groups = findGroups(samples);
        var length = groups.length;
        var color = Math.round(0x7FFFFF/(length-1));
        if(sample.position.getDimention() != 2) return false;
        var c = (color*groups.indexOf(group ? group : sample.group)).toString(16);
        var cc = ("000000" + c).substring(c.length, c.length + 6);
        screen.drawPixel(sample.position, true, '#' + cc);
    }

    var initScreen = function(screen)
    {
        screen.clear();
        screen.drawAxis();
    }

    var log = function(str)
    {
        var o = document.getElementById('output');
        o.value += (str + '\n');
        // console.log(str);
        o.scrollTop = o.scrollHeight;
    }
}

var app =  new TestPerceptron();
app.setup();
// app.run();